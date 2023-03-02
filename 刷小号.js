requestScreenCapture();
sleep(1000);
setInterval(() => { }, 1000);
var w = floaty.rawWindow(
    <frame gravity="center">
        <LinearLayout android:orientation="vertical">
            <button id="button" size="12" text="停止" />
        </LinearLayout>
    </frame>
);
w.button.on("click", function() {

    刷小号();

})
function 刷小号() {
    while (true) {
        //ksyx
        if (bs("#e5cd80", 584, 528)) {
            click(584, 528)
            for (var i = 0; i < 30; i++) {
                if (bs("#755a47", 179, 151)) {
                    click(150, 270)
                    break;
                }
                sleep(100)
            }
        }
        if (bs("#dc0707", 953, 90)) {
            click(930, 113)
            sleep(2000)
            click(250, 310)
            sleep(500)
            click(250, 310)
            sleep(500)
            click(970, 520)
            sleep(500)
            setClip("07680f0o01")
            sleep(500)
            className("android.widget.EditText").paste()
            sleep(500)
            click(1076, 186)
            sleep(500)
            click(948, 599)
            device.vibrate(1000)
            break;
        }


        //lqrw
        if (bs("#a4c635", 203, 612)) click(23, 612);
        //qd
        if (bs("#a9c938", 637, 477)) click(637, 477);
        //lq
        if (bs("#a5c735", 629, 557)) click(629, 557);
        //gb
        if (bs("#e5d46f", 1096, 243)) {
            click(1140, 127)
            sleep(500)
            click(750, 450)
            sleep(500)
            click(1140, 163)
        }
    }
}
//fl



function bs(colors, x, y) {
    let img = captureScreen();
    let point = findColor(img, colors, {
        region: [x, y, 3, 3],
        threshold: 4
    });
    if (point) {
        return true;
    } else {
        return false
    }
}