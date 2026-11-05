# Browser tests: pip install playwright && playwright install chromium
# Usage: BASE_URL=http://localhost:3000 python tests/ui_test.py
import asyncio, json
from playwright.async_api import async_playwright
import os
CH=os.environ.get("CHROME_PATH") or None; B=os.environ.get("BASE_URL","http://localhost:3000").rstrip("/")
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CH, args=["--use-gl=swiftshader","--enable-webgl","--ignore-gpu-blocklist"])
        global R, errs
        errs=[]; R=[]
        def ok(name, cond): R.append(("PASS" if cond else "FAIL")+"  "+name)
        # 1. Booking flow
        pg = await b.new_page(viewport={"width":1280,"height":900})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type=="error" else None)
        await pg.goto(B+"/book-consultation?service=graphology", wait_until="networkidle")
        await pg.click("text=Essential only")
        await pg.wait_for_timeout(400); ok("service preselected from URL", await pg.input_value("#f-service_slug")=="graphology")
        await pg.click("text=Request consultation")
        ok("client errors shown on empty submit", await pg.locator(".err").count()>=4)
        ok("focus moves to first invalid field", await pg.evaluate("document.activeElement.id")=="f-full_name")
        await pg.fill("#f-full_name","Priya Sharma"); await pg.fill("#f-phone","+91 98765 43210"); await pg.fill("#f-email","priya@example.com")
        await pg.check("input[name=mode][value=online]"); await pg.fill("#f-preferred_date","2027-02-10")
        await pg.select_option("#f-preferred_time","11:00"); await pg.fill("#f-message","Career question")
        await pg.check("#f-consent"); await pg.wait_for_timeout(2600)  # beat the bot-speed trap
        await pg.click("text=Request consultation")
        await pg.wait_for_selector("text=Request received", timeout=8000)
        ok("success state shown", True)
        wa = await pg.get_attribute("text=Send on WhatsApp","href")
        ok("WhatsApp follow-up prefilled with booking", wa.startswith("https://wa.me/917992512533?text=") and "Graphology" in wa)
        events=[e.get("event") for e in await pg.evaluate("window.dataLayer.filter(e=>e && e.event)")]
        ok(f"analytics events {events}", "generate_lead" in events and "consultation_request" in events)
        # 2. Floating buttons + tracking
        await pg.goto(B+"/services/vedic-astrology", wait_until="networkidle")
        ok("call button tel link", await pg.get_attribute("a[aria-label^='Call']","href")=="tel:+917992512533")
        ev=[e.get("event") for e in await pg.evaluate("window.dataLayer.filter(e=>e && e.event)")]
        ok("service_view fired", "service_view" in ev)
        # 3. Consent: GTM must not load before accepting
        ok("no GTM loaded without consent", await pg.evaluate("!!document.querySelector('script[src*=googletagmanager]')")==False)
        # 4. Blog search
        await pg.goto(B+"/blog", wait_until="networkidle")
        await pg.fill("input[type=search]","rented")
        await pg.wait_for_timeout(300)
        ok("blog search filters", await pg.locator("text=Non-invasive Vastu for rented homes").count()>=1 and await pg.locator("h3:has-text('How to prepare')").count()==0)
        await pg.fill("input[type=search]","zzzz"); ok("blog empty-search message", await pg.locator("text=No articles match").count()==1)
        # 5. Mobile menu
        m = await b.new_page(viewport={"width":390,"height":844}, is_mobile=True)
        await m.goto(B+"/", wait_until="networkidle"); await m.click("text=Essential only")
        await m.click("button[aria-label='Open menu']"); await m.wait_for_timeout(500)
        ok("mobile menu opens", await m.locator("[role=dialog][aria-label=Menu]").is_visible())
        await m.click("[role=dialog] >> text=Services"); await m.wait_for_url("**/services"); await m.wait_for_timeout(600); 
        ok("mobile menu navigates & closes", await m.locator("[role=dialog][aria-label=Menu]").count()==0)
        sw = await m.evaluate("document.documentElement.scrollWidth"); ok(f"no horizontal scroll on mobile ({sw}px)", sw<=390)
        await m.goto(B+"/", wait_until="load"); await m.wait_for_timeout(2500)
        await m.screenshot(path="/tmp/mob-home.png", full_page=False)
        # 6. Reduced motion: no WebGL canvas
        rm = await b.new_context(reduced_motion="reduce"); rp = await rm.new_page()
        await rp.goto(B+"/", wait_until="load"); await rp.wait_for_timeout(2000)
        ok("reduced motion: no WebGL canvas", await rp.locator("canvas").count()==0)
        full = await b.new_page(); await full.goto(B+"/", wait_until="load"); await full.wait_for_timeout(2500)
        ok("no WebGL before interaction", await full.locator("canvas").count()==0)
        await full.mouse.move(400,400); await full.wait_for_timeout(2500)
        ok("software renderer (headless): stays on static yantra after interaction", await full.locator("canvas").count()==0)
        # 7. Keyboard: skip link
        k = await b.new_page(); await k.goto(B+"/about"); await k.keyboard.press("Tab")
        ok("first Tab focuses skip link", (await k.evaluate("document.activeElement.textContent"))=="Skip to content")
        print("\n".join(R)); print("console errors:", errs or "none")
        await b.close()
R=[]; errs=[]
try:
    asyncio.run(main())
except Exception as e:
    print("\n".join(R)); print("ABORTED:", str(e)[:300])
