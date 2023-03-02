//获取截图权限
requestScreenCapture();
ocr = $plugins.load("com.hraps.ocr")
sleep(1000);
//设置界面
var h = dialogs.input("请输入账号序号", 1) - 1;
var j = dialogs.input("请输入角色序号", 1) - 1;
var renwuqingdan = dialogs.multiChoice(
    "小虾米小号助手设置", ["创建小号", "cdk"]
);

//运行提示浮窗设置
{
    var w = floaty.rawWindow(
        <frame gravity="center">
            <LinearLayout android:orientation="vertical">
            <text id="text" color="red" size="6">小虾米小号日常</text>
                <text id="tip1" color="green" size="8"></text>
                <text id="tip2" color="green" size="8"></text>
                <text id="tip3" color="green" size="8"></text>
                <text id="tip4" color="green" size="8"></text>
            </LinearLayout>
        </frame>
    );
    w.setTouchable(false);
    w.setPosition(0, 300);
    w.setSize(-2, -2);
    setTimeout(() => {
        w.close();
    }, 5000);
}
//脚本内容
//设定任务e
var flag = true;
for (let i = h; i < 10; i++) {
    for (let k = j; k < 4; k++) {
        if (flag) {
            j = 0;
            flag = false
        }
        let a = i + 1;
        let b = k + 1;
        wtip("小号:" + a + "第" + b + "个");
        var cq = false;
        登录账户(a, b);
        //任务列表
        renwuqingdan.forEach(e => {
if (e == 0) {
                创建小号();
            };
            if (e == 1) {
                cdk();
            };
        });
    }
    if ( flag) {
        j = 0;
        flag = false
    }
}


function 重启游戏() {
    wtip("重启游戏");
    recents();
    sleep(2000);
    id("clear_all_recents_image_button").findOne(2000).click();
    sleep(2000);
    app.launchApp("小虾米闯江湖");
};
////////////////////////////功能函数//////////////////////////////////

function 界面文字查找(要查找文字) {
    //导入插件

    //导入需识别的图片，请自行输入图片路径
    let img = images.captureScreen();
    //识别图片
    results = ocr.detect(img.getBitmap(), 1);
    // console.info("过滤前结果数：" + results.size())
    //识别结果过滤
    results = ocr.filterScore(results, 0.5, 0.5, 0.5)
    //输出最终结果
    if (results.size() > 0) {
        for (var i = 0; i < results.size(); i++) {
            var re = results.get(i)
            // log(re.text)
            if (re.text == 要查找文字) {
                return re.text;
                break;
            };
        };
    };
};
function 界面区域文字查找(要查找文字, x, y, w, h) {
    //导入插件

    //导入需识别的图片，请自行输入图片路径
    let img = images.captureScreen();
    let clip = images.clip(img, x, y, w, h);
    //识别图片
    results = ocr.detect(clip.getBitmap(), 1);
    // console.info("过滤前结果数：" + results.size())
    clip.recycle();
    //识别结果过滤
    results = ocr.filterScore(results, 0.5, 0.5, 0.5)
    //输出最终结果
    if (results.size() > 0) {
        for (var i = 0; i < results.size(); i++) {
            var re = results.get(i)
            log("识别结果："+re.text)
            if (re.text == 要查找文字) {
                toastLog("找到文字：" + 要查找文字);
                return re.text;
                break;
            };
        };
    } else {
        return false
    };
};
function 重启游戏() {
    wtip("重启游戏");
    recents();
    sleep(2000);
    id("clear_all_recents_image_button").findOne(2000).click();
    sleep(4000);
    app.launchApp("小虾米闯江湖");
};
function 图片点击(a) {
    let img = captureScreen();
    sleep(100);
    let 坐标 = images.findImage(img, a);
    click(坐标.x, 坐标.y)
    sleep(500);
    return 坐标.x;
    a.recycle();
};
function wtip(a) {
    ui.run(function(){
    w.tip1.setText(w.tip2.getText());
    w.tip2.setText(w.tip3.getText());
    w.tip3.setText(w.tip4.getText());
    w.tip4.setText(a);})
};
function 人物位置() {
    //导入插件

    //导入需识别的图片，请自行输入图片路径
    let img = images.captureScreen();
    let clip = images.clip(img, 560, 100, 160, 145);
    //识别图片
    results = ocr.detect(clip.getBitmap(), 1)
    // console.info("过滤前结果数：" + results.size())
    clip.recycle();
    //识别结果过滤
    results = ocr.filterScore(results, 0.5, 0.5, 0.5)
    //输出最终结果
    if (results.size() > 0) {
        for (var i = 0; i < results.size(); i++) {
            var re = results.get(i)
            // log("结果:" + i + "  文字:" + re.text + "  位置:" + re.frame + "  角度类型:" + re.angleType)
            // log("区域置信度:" + re.dbScore + "  角度置信度:" + re.angleScore + "  文字置信度:" + re.crnnScore + "\n")
        }
        return re.text;
    };
};
function 找色(colors) {
    while (true) {
        var img = captureScreen();
        var point = findColor(img, colors);
        if (point) {
            toast("找到了，坐标为(" + point.x + ", " + point.y + ")");
            break;
        }
        sleep(50);
    }
    return point;
};
function 两点找色(color, dx, dy, colors) {
    let img = captureScreen();
    let a = images.findMultiColors(img, color, [[dx, dy, colors]]);
};
function 等待主界面() {
    for (let i = 0; i < 50; i++) {
        if (界面区域文字查找("菜单", 600, 1200, 120, 80)) {
            toast("当前位置：主界面");
            break;
        }
        sleep(200);
    }
    sleep(500)
}
function 等待开始游戏() {
    for (let i = 0; i < 50; i++) {
        if (界面区域文字查找("换区", 471, 787, 50, 30)) {
            toast("开始游戏");
            click(246, 849)
            break;
        };
        sleep(200);
    }
}
function 等待选择角色() {
    for (let i = 0; i < 50; i++) {
        if (界面区域文字查找("开始游戏", 268, 1077, 300, 200)) {
            toast("选择角色");
            sleep(500)
            break;
        };
        sleep(200);
    }
}
function wait(界面文字, x, y, w, h) {
    for (let i = 0; i < 50; i++) {
        if (界面区域文字查找(界面文字, x, y, w, h)) {
            toast("(" + 界面文字 + ")出现！");
            sleep(500)
            break;
        } else { return false };
        sleep(200);
    }
}
function 出口() {
    let img = captureScreen()
    let a = findColor(img, "#f708ff", {
        region: [100, 400, 500, 500],
        threshold: 4
    });
    return a
}
function 强盗() {
    let img = captureScreen()
    let a = findColor(img, "#cc0000", {
        region: [100, 400, 500, 500],
        threshold: 4
    });
    return a
}
function bs(colors, x, y) {
    let img = captureScreen();
    let point = findColor(img, colors, {
        region: [x, y, 3, 3],
        threshold: 4
    });
    if (point) { return true; }
    else { return false }
}
function 指导() {
    let img = captureScreen()
    let a = findColor(img, "#f6f41b", {
        region: [80, 362, 560, 900],
        threshold: 8
    })
    if (a)click(a.x, a.y)
}




//任务函数
function 登录账户(a, b) {
    重启游戏()
    if (id("tv_choose_account_word").findOne(40000) == null) {
        wtip("登录超时重启");
        登录账户(a,b)
    };
    wtip("选择小号" + a);
    if (id("tv_small_account_login_name").text(a).findOne(3000)) {
        id("tv_small_account_login_name").text(a).findOne().clickCenter()
    } else {
        swipe(453, 1018, 430, 340, 1000);
        sleep(1000);
        id("tv_small_account_login_name").text(a).findOne().clickCenter()
    };
    等待开始游戏()
    sleep(2000)
    等待选择角色()
    wtip("选择角色: " + b);
    switch (b) {
        case 1:
            click(217, 780);
            wtip("确认角色: 1");
            break;
        case 2:
            click(520, 780);
            wtip("确认角色: 2");
            break;
        case 3:
            click(217, 910);
            wtip("确认角色: 3");
            break;
        case 4:
            click(520, 910);
            wtip("确认角色: 4");
            break;
    };
    sleep(100);
    click(340, 1120);
    sleep(4000);
    //离线挂机确定
    等待主界面()
    sleep(2000)
    
        click(300, 840);
        sleep(500);
        click(300, 840);
        sleep(500);
        click(300, 990);
        sleep(500);
        click(300, 990);
        sleep(500);
    
};

function 创建小号() {

    let flag = false;
    while (!flag) {

        click(673, 315)
        sleep(1000)

        if (人物位置() == "第1层 (6级)") {
            flag = true;
            log("完成初始任务")
        }
        if (人物位置() == "无名山洞") {
            click(200, 370)
            sleep(3000)
        }

        let img = captureScreen();
        if (findColor(img, "#ffee00", {
                region: [284, 788, 1, 1],
                threshold: 4
            })) {
            click(284, 768)
            sleep(500)
            click(284, 768)
        }
        if (findColor(img, "#ffcc00", {
                region: [313, 702, 1, 1],
                threshold: 4
            })) click(280, 715)
        if (findColor(img, "#e4e032", {
                region: [656, 160, 1, 1],
                threshold: 4
            })) click(656, 160)
        if (findColor(img, "#f4f8f8", {
                region: [653, 1228, 1, 1],
                threshold: 4
            })) click(653, 1228)
        if (findColor(img, "#cc1111", {
                region: [492, 323, 1, 1],
                threshold: 4
            })) click(367, 321)
        if (findColor(img, "#ffcc00", {
                region: [315, 1132, 1, 1],
                threshold: 4
            })) click(315, 1132)
        指导()


    };
};
function cdk() {
    sleep(1000)
    click(643, 1244)
    sleep(1500)
    click(643, 1138)
    sleep(1500)
    

    let cdk = ["X7666", "XQ666", "XXMCJH9", "xxmcjh8",
        "xxmcjh7", "xxmcjh6", "xxmcjh5", "xxmcjh4",
        "xxmcjh3", "xxmcjh2", "xxmcjh1"
    ]
    for (var i = 0; i < 11; i++) {
        click(515, 646)
    sleep(500)
        click(405, 646)
        sleep(500)
        setClip(cdk[i])
        log("CDK是"+cdk[i])
        className("android.widget.EditText").paste()
        click(440, 500)
        sleep(500)
        click(537, 702)
        sleep(500)
    }
}