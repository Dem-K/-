//获取截图权限
ocr = $plugins.load("com.hraps.ocr")
requestScreenCapture();
sleep(1000);
/////////////////////////////设置界面//////////////////////////////
var h = Number(dialogs.select("请输入账号序号",[ 1,2,3,4,5,6,7,8,10]));
var j = Number(dialogs.select("请输入角色序号",[ 1,2,3,4]));
var renwuqingdan = dialogs.multiChoice(
    "小虾米小号日常设置", ["每日签到|江湖酒馆", "收邮件", "好友送礼", "帮会贡献", "帮会祭天", "帮会强盗入侵", "剑阁", "比武", "更新装备并熔炼", "挂机满经验", "帮会战","临时任务："], 
    [0, 1, 3, 4, 5,6, 7, 8,10]
);

//运行提示浮窗设置
{
    var w = floaty.rawWindow(
        <frame gravity="center">

            <LinearLayout android:orientation="vertical">
                <button id="button" size="12" text="停止" />
                <text id="text" color="red" size="6">小虾米小号日常</text>
                <text id="tip1" color="yellow" size="8">
                </text>
                <text id="tip2" color="green" size="8">
                </text>
                <text id="tip3" color="green" size="8">
                </text>
                <text id="tip4" color="green" size="8">
                </text>
                <text id="tip5" color="green" size="8">
                </text>
                <text id="tip6" color="green" size="8">
                </text>
                <text id="tip7" color="green" size="8">
                </text>
                <text id="tip8" color="green" size="8">
                </text>
            </LinearLayout>
        </frame>
    );
    w.setTouchable(true);
    w.setPosition(0, 500);
    w.setSize(100, 400);
    setTimeout(() => {
        w.close();
    }, 5000);
}

w.button.on("click", function () {

    exit();

})

/////////////////////////脚本内容//////////////////////////////////
//设定任务
var flag = true;
for (let i = h; i < 10; i++) {
    for (let k = j; k < 4; k++) {
        //清空悬浮窗列表
        w.tip2.setText("");
        w.tip3.setText("");
        w.tip4.setText("");
        w.tip5.setText("");
        w.tip6.setText("");
        w.tip7.setText("");
        w.tip8.setText("");
        if (flag) {
            j = 0;
            flag = false
        }
        let a = i + 1;
        let b = k + 1;
        w.tip1.setText("小号:" + a + "第" + b + "个");
        var cq = false;
        登录账户(a, b);
        //任务列表
        renwuqingdan.forEach(e => {

            if (e == 0) {
                每日签到();
                江湖酒馆();
            };
            if (e == 1) {
                收邮件();
            };
            if (e == 2) {
                if (i < 3) {
                    好友送礼();
                };
            };
            if (e == 3) {
                帮会贡献();
            };
            if (e == 4) {
                帮会祭天();
            };
            if (e == 5) {
                帮会强盗入侵();
            };
            if (e == 6) {
                剑阁();
            };
            if (e == 7) {
                比武();
            };
            if (e == 8) {
                更新装备并熔炼();
            };
            if (e == 9) {
                挂机满经验();
            };
            if (e == 10) {
               帮会战();
            };
            if (e == 11) {
                临时任务();
            };
        });
         
    }
    if (k = 3 || flag) {
        j = 0;
        flag = false
    }
}
//任务做完挂机
for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 4; k++) {
        //清空悬浮窗列表
        w.tip2.setText("");
        w.tip3.setText("");
        w.tip4.setText("");
        w.tip5.setText("");
        w.tip6.setText("");
        w.tip7.setText("");
        w.tip8.setText("");
        if (flag) {
            j = 0;
            flag = false
        }
        let a = i + 1;
        let b = k + 1;
        w.tip1.setText("小号:" + a + "第" + b + "个");
        var cq = false;
        登录账户(a, b);
        挂机满经验();
    }
}
////////////////////////////功能函数//////////////////////////////////

function 界面文字查找(要查找文字) {
    //导入插件

    //导入需识别的图片，请自行输入图片路径
    let img = images.captureScreen();
    sleep(200)
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
    sleep(200)
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
            log("识别结果：" + re.text)
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

function 停止指定app(appName) {
    var packageName = getPackageName(appName);
    app.openAppSetting(packageName)
    sleep(1000)
    id("right_button").text("强行停止").click()
    sleep(1000)
    id("button1").text("强行停止").click()
}

function 重启游戏() {
    wtip("重启游戏");
    停止指定app("小虾米闯江湖");
    app.launchApp("小虾米闯江湖");
};

function 图片点击(a) {
    let img = captureScreen();
    sleep(200);
    let 坐标 = images.findImage(img, a);
    click(坐标.x, 坐标.y)
    sleep(500);
    return 坐标.x;
    a.recycle();
};

function wtip(a) {
    ui.run(function () {

        w.tip2.setText(w.tip3.getText());
        w.tip3.setText(w.tip4.getText());
        w.tip4.setText(w.tip5.getText());
        w.tip5.setText(w.tip6.getText());
        w.tip6.setText(w.tip7.getText());
        w.tip7.setText(w.tip8.getText());
        w.tip8.setText(a);
    })
};

function 人物位置() {
    //导入插件

    //导入需识别的图片，请自行输入图片路径
    let img = images.captureScreen();
    sleep(200)
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
        sleep(200)
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
    sleep(200)
    let a = images.findMultiColors(img, color, [
        [dx, dy, colors]
    ]);
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
            sleep(200)
            return true;
            break;
        } else {
            return false
        };
        sleep(200);
    }
    sleep(200)
}

function 出口() {
    let img = captureScreen()
    sleep(200)
    let a = findColor(img, "#f708ff", {
        region: [100, 400, 500, 500],
        threshold: 4
    });
    return a
}

function 强盗() {
    let img = captureScreen()
    sleep(200)
    let a = findColor(img, "#cc0000", {
        region: [100, 400, 500, 500],
        threshold: 4
    });
    return a
}

function bs(colors, x, y) {
    let img = captureScreen();
    sleep(200)
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

function 暂停() {
    while (command == 1);
}

///////////////////////////////////任务函数///////////////////////////////

function 登录账户(a, b) {
    launchApp("小虾米闯江湖");
    重启游戏()
    if (id("tv_choose_account_word").findOne(40000) == null) {
        wtip("登录超时重启");
        登录账户(a, b)
        cq = true
    };
    if (!cq) {
        // wtip("选择小号" + a);
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
        //      wtip("选择角色: " + b);
        switch (b) {
            case 1:
                click(217, 780);
                //            wtip("确认角色: 1");
                break;
            case 2:
                click(520, 780);
                //          wtip("确认角色: 2");
                break;
            case 3:
                click(217, 910);
                //        wtip("确认角色: 3");
                break;
            case 4:
                click(520, 910);
                //      wtip("确认角色: 4");
                break;
        };
        sleep(100);
        click(340, 1120);
        sleep(4000);
        //离线挂机确定
        等待主界面()
        sleep(1000)

        if (wait("离线收益", 265, 265, 200, 80)) {
            click(330, 980)
        }
        if (wait("离线收益", 265, 410, 200, 80)) {
            click(330, 830)
        }
    }
};

function 帮会贡献() {
    wtip("帮会贡献");
    等待主界面()
    sleep(1000)
    click(618, 1230)
    sleep(1000);
    click(622, 1005)
    sleep(1000)
    wait("我的帮会", 115, 341, 150, 150)
    sleep(200)
    click(434, 942)
    sleep(500)
    wait("高级物资", 124, 826, 150, 150)

    sleep(500)
    click(477, 951);
    sleep(1000)
    click(260, 710);
    sleep(1000);
    click(666, 220);
    sleep(1000);
    click(666, 220);
    sleep(1000);
};

function 帮会祭天() {
    wtip("帮会祭天");
    等待主界面()
    sleep(1000)
    click(618, 1230)
    sleep(1000);
    click(622, 1005)
    sleep(1000)
    wait("我的帮会", 115, 341, 150, 150)
    click(290, 300);
    sleep(1000);
    click(520, 640);
    sleep(1000);
    click(560, 1040);
    sleep(1000);
    click(260, 720);
    sleep(1000);
    //关闭帮会窗口
    click(666, 220);
    sleep(1000);
    click(666, 220);
    sleep(1000);
};

function 收邮件() {
    wtip("收邮件");
    等待主界面()
    sleep(1000)
    for (let i = 0; i < 100; i++) {

        let img = captureScreen();
        sleep(200)
        var p = images.findMultiColors(img, -4677, [
            [0, 0, -4677],
            [-21, -16, -4677],
            [-30, -1, -4677],
            [-20, 20, -14610159]
        ], {
            "region": [30, 821, 46, 208],
            "threshold": 4
        });
        if (p) {
            log(p.x, p.y);
            click(p.x, p.y);
            toast('找到了邮件' + p.x + ',' + p.y);
            break;
        } else {
            toast('没找到邮件');
            click(630, 900);
        };
        sleep(500);
    }
    sleep(1000);
    click(330, 300);
    sleep(1500);
    click(310, 1000);
    sleep(1000);
    click(653, 233);
    sleep(1500);

};

function 比武() {
    wtip("比武");
    等待主界面()
    sleep(1000)

    //到达并打开比武界面
    if (人物位置() == "比武论剑") {
        click(650, 130);
        sleep(2500);
        if (出口()) click(出口().x, 出口().y - 20);
        sleep(3000);
        click(660, 270)
        sleep(1000)
        click(660, 240)
        sleep(1000)
        //走到入口位置
        click(280, 560);
        sleep(1000);
        click(660, 270)
        sleep(3000)
        click(360, 700);
        sleep(1000);

    } else {
        click(165, 220);
        sleep(2000);
        wait("日常", 264, 318, 60, 40)
        click(410, 330);
        sleep(1500);
        click(560, 840);
        sleep(1000);
        while (人物位置() !== "比武论剑") {
            let img = captureScreen();
            sleep(200)
            let a = images.findColor(img, "#ee9900", {
                region: [105, 438, 513, 510],
                ththreshold: 0
            })
            if (a) {
                click(a.x, a.y)
                sleep(100)
            }
            sleep(100);
        };

        click(660, 240)
        sleep(1000)
        //走到入口位置
        click(280, 560);
        sleep(1000);
        click(660, 270)
        sleep(3000)
        click(360, 700);
        sleep(1000);
    };
    //比武中
    for (let i = 0; i < 50; i++) {
        if (界面区域文字查找("当前排行", 74, 176, 120, 60)) {
            log("进入比武界面");
            sleep(1500);
            break;
        };
        sleep(200);
    }
    sleep(1000);
    click(470, 710);
    sleep(1000);
    click(210, 1100);
    sleep(1000);
    click(566, 394);
    sleep(1000);
    for (let i = 0; i < 250; i++) {
        if (界面区域文字查找("当前排行", 74, 176, 120, 60)) {
            click(686, 120);
            log("关闭比武界面");
            sleep(1500);
            click(430.850);
            break;
        } else {
            click(426, 846)
        };
        sleep(200);
    }
};

function 帮会强盗入侵() {
    wtip("帮会强盗入侵");
    等待主界面()
    sleep(1000)
    click(618, 1230)
    sleep(1000);
    click(622, 1005)
    sleep(1000)
    wait("我的帮会", 115, 341, 150, 150)
    sleep(1000)
    click(570, 1040)
    sleep(5000);
    //帮派地图内
    for (let i = 0; i < 20; i++) {
        if (人物位置() == "帮派地图") {
            click(620, 220);
            sleep(500);
            if (强盗()) click(强盗().x + 5, 强盗().y + 5);
            sleep(4000);
            //攻击强盗
            toastLog("攻击强盗")
            for (let i = 0; i < 10; i++) {
                if(界面区域文字查找("帮会强盗",300,300,130,50)){
                    click(185, 865);
                    sleep(1000);
                    click(590, 470);
                }
                sleep(1000);
            }
            for (let i = 0; i < 4; i++) {
                if(界面区域文字查找("帮会强盗",300,300,130,50)){
                    click(517, 865);
                    sleep(1000);
                    click(590, 470);
                }
                sleep(1000);
            }
            click(660, 300);
            sleep(2000);
            click(650, 201);
            sleep(2000);
            if (出口()) click(出口().x, 出口().y);
            sleep(8000);
            break;
        };
        sleep(500);
    };
};

function 每日签到() {
    let flag = false;
    wtip("每日签到");
    等待主界面()
    sleep(1000)
    click(683, 152)
    sleep(2000)
    click(352, 340)
    sleep(1000)
    try {
        if (!flag) {
            let img = captureScreen()
            sleep(200)
            let a = images.findColor(img, "#ffeeaa", {
                region: [120, 370, 600, 600],
                ththreshold: 0
            })
            if (a) {
                click(a.x, a.y)
                sleep(100)
                flag = true
            }
        }
    } catch (error) {
        log("签到已点完")
    }
    sleep(2000)
    click(280, 230)
    sleep(1000)
    click(440, 230)
    sleep(1000)
    click(600, 230)
    sleep(1000)
    click(124, 308)
    sleep(1000)
    click(124, 308)
    sleep(1000)
    click(683, 152)
    sleep(1000)
};

function 好友送礼() {
    wtip("好友送礼");
    等待主界面()
    sleep(1000)
    click(618, 1230)
    sleep(1000);
    click(618, 475)
    sleep(1000);
    click(550, 430)
    sleep(1000);
    click(360, 800)
    sleep(1000);
    click(640, 270)
    sleep(1000);
    click(640, 270)
    sleep(1000);
    click(660, 210)
    sleep(1000);
}

function 更新装备并熔炼() {
    wtip("更新装备并熔炼");
    等待主界面()
    sleep(2000)
    if (wait("临时爸库", 0, 310, 130, 50)) {
        sleep(1000)
        click(50, 312)
        sleep(1000)
        click(350, 980)
        sleep(1000)
    }
    if (wait("临时仓库", 0, 310, 130, 50)) {
        sleep(1000)
        click(50, 312)
        sleep(1000)
        click(350, 980)
        sleep(1000)

    }
    click(622, 1246)
    sleep(1000)
    click(622, 810)
    sleep(4000)
    //一键换装
    click(275, 590)
    sleep(1000)
    click(450, 680)
    sleep(3000)
    for (let i = 0; i < 4; i++) {
        click(190 + 120 * i, 1220)
        sleep(1000)
        click(450, 680)
        sleep(3000)
    }
    click(660, 1215)
    sleep(1000)
    click(622, 1246)
    sleep(1000)
    click(620, 872)
    sleep(3000)
    click(320, 1034)
    sleep(4000)
    for (let i = 0; i < 5; i++) {
        click(356, 770)
        sleep(1000)
    }
    click(650, 50)
    sleep(1000)
    click(670, 200)
}

function 挂机满经验() {
    wtip("挂机满经验");
    等待主界面()
    sleep(1000)
    click(680, 1020)
    sleep(1000)
    click(470, 1010)
    sleep(3000)
    click(510, 1075)
    sleep(1000)
    let max = false;
    let i = 0;
    while (!max) {
        if (bs("#3ab6bf", 702, 989)) {
            log("经验已满")
            i = i + 1

        }
        if (i == 2) {
            max = true;
            break;
        }
        sleep(200)
    }
    log("挂满经验")
}

function 剑阁() {
    wtip("剑阁");
    等待主界面()
    sleep(1000)
    click(165, 220);
    sleep(2000);
    wait("日常", 264, 318, 60, 40)
    click(410, 330);
    sleep(1500);
    click(560, 1070);
    sleep(1000);
    while (界面区域文字查找("剑阁", 333, 786, 110, 60) !== "剑阁") {
        let img = captureScreen();
        sleep(200)
        let a = images.findColor(img, "#ee9900", {
            region: [105, 438, 513, 510],
            ththreshold: 0
        })
        if (a) {
            click(a.x, a.y)
            sleep(100)
        }
        sleep(100);
    };
    click(390, 756)
    sleep(2000)
    //不是1层滑到最上方
    if (!界面区域文字查找("剑阁1层", 300, 440, 120, 40)) {
        swipe(450, 480, 450, 1160, 300)
        sleep(2000)
        swipe(450, 480, 450, 1160, 300)
        sleep(2000)
        swipe(450, 480, 450, 1160, 300)
        sleep(2000)
        swipe(450, 480, 450, 1160, 300)
        sleep(1500)
        swipe(450, 480, 450, 1160, 300)
        sleep(1500)
        swipe(450, 480, 450, 1160, 300)
        sleep(1500)
        swipe(450, 480, 450, 1160, 300)
        sleep(1500)
    }
    click(540, 1010)
    sleep(1000)
    click(360, 700)
    sleep(500)
    var jm = 0;
    while (true) {
        //失败结束
        if (界面区域文字查找("活动", 230, 226, 60, 40)) {
            jm++;
            log("jm-" + jm);
            if (jm > 3) break;
            sleep(1000)
        }
        //打完退出

        if (界面区域文字查找("Boss", 290, 860, 120, 40)) {

            if (bs("#cc1111", 329, 798)) {
                click(660, 250);
                sleep(1000)
                click(350, 1100);
                sleep(1000)
                break;
            }
        }

        //闯关
        if (界面区域文字查找("奖励详情", 300, 250, 130, 40)) {
            jm = 0;
            let img = captureScreen()
            sleep(200)
            let a = images.findColor(img, "#ee9900", {
                region: [105, 438, 513, 510],
                ththreshold: 0
            })
            if (a) {
                click(a.x, a.y)
                sleep(100)
            } else {
                swipe(450, 930, 450, 480, 2000)
                sleep(500)
            }
        }

    }
}
function 江湖酒馆() {
    wtip("江湖酒馆")
    click(92, 1235)
    wait("江湖酒馆", 160, 580, 130, 40)
    click(206, 721)
    sleep(1000)
    //标准宴席
    click(250, 1070)
    sleep(1000)
    click(220, 830)
    sleep(1000)
    //确认
    click(270, 712)
    sleep(1000)
    //豪华宴席
    click(470, 1070)
    sleep(1000)
    //确认
    click(270, 712)
    sleep(1000)
    click(470, 1070)
    sleep(1000)
    //确认
    click(270, 712)
    sleep(1000)
    click(470, 1070)
    sleep(1000)
    //确认
    click(270, 712)
    sleep(1000)
    click(663, 150)
    sleep(1000)
}
function 帮会战() {
    等待主界面()
    sleep(1000)
    click(618, 1230)
    sleep(1000);
    click(622, 1005)
    sleep(1000)
    wait("我的帮会", 115, 341, 150, 150)
    click(290, 300);
    sleep(1000);
    click(530, 470)
    sleep(1500)
    wait("帮战", 322, 225, 70, 40)
    for (let i = 0; i < 5; i++) {
        click(514, 400 + 110 * i)
        sleep(200)
        while (!界面区域文字查找("帮战", 322, 225, 70, 40)) { }
    }
    //更换对手
    click(582,320)
    sleep(1000)
    click(270,710)
    sleep(500)
    click(650,225)
    sleep(500)
};
///////////////////临时任务////////////////
function 临时任务() {
    等待主界面()
    click(258, 214)
    sleep(4000)
    click(338, 282)
    sleep(2000)
    click(368, 1096)
    sleep(1000)
}