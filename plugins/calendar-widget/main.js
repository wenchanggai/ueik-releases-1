export default function ({ workspace, i18n }) {
    console.log("📅 [Calendar Widget] 社区日历插件启动！(From ueik-releases)");
    const unregLocale = i18n.registerLocale({
        'zh-cn': { tooltip: '今天是个好日子！' },
        'en-us': { tooltip: 'A good day!' }
    });
    
    let unreg = null;
    const tick = () => {
        const d = new Date();
        unreg = workspace.registerStatusBar({
            id: 'calendar-widget',
            type: 'label',
            order: 90,
            align: 'right',
            title: '📅 ' + (d.getMonth() + 1) + '月' + d.getDate() + '日',
            tooltip: i18n.t('tooltip')
        });
    };
    
    tick();
    // 每天更新一次
    const timer = setInterval(tick, 1000 * 60 * 60 * 24); 
    
    return () => {
        console.log("🛑 [Calendar Widget] 社区日历插件卸载！");
        clearInterval(timer);
        if (unreg) unreg();
        if (unregLocale) unregLocale();
    }
}
