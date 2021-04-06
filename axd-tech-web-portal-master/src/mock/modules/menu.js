// eslint-disable-next-line no-unused-vars
import Mock from 'mockjs'

// 登录
export function getMenus() {
    return {
        // isOpen: false,
        url: 'api/menu/getMenus',
        type: 'get',
        data: {
            'code': 200,
            'msg': 'success',
            'data': menuList
        }
    }
}
/*
    menuId       表示当前菜单项 ID
    parentId     表示父菜单项 ID
    name_zh      表示菜单名（中文）
    name_en      表示菜单名（英语）
    url          表示路由跳转路径（自身模块 或者 外部 url）
    type         表示当前菜单项的级别（0: 目录，1: 菜单项，2: 按钮）
    icon         表示当前菜单项的图标
    orderNum     表示当前菜单项的顺序
    subMenuList  表示当前菜单项的子菜单
    menuType     表示是哪种菜单el-submenu 0 el-menu-item 1
*/
var menuList = [{
    'menuId': 1,
    'parentId': 0,
    'name_zh': '首页',
    'name_en': 'Homepage',
    'url': '',
    'type': 1,
    // 'icon': 'el-icon-info',
    'orderNum': 1,
    'menuType': 1,
    'subMenuList': [{
        'menuId': 2,
        'parentId': 1,
        'name_zh': '首页详情',
        'name_en': 'HmoeInformation',
        'url': 'views/Home',
        'type': 1,
        // 'icon': 'el-icon-menu',
        'orderNum': 1,
        'menuType': 0,
        'subMenuList': []
    }]
},
{
    'menuId': 3,
    'parentId': 0,
    'name_zh': '技术需求',
    'name_en': 'TechnicalRequirements',
    'url': '',
    'type': 1,
    // 'icon': 'el-icon-info',
    'orderNum': 2,
    'menuType': 1,
    'subMenuList': [{
        'menuId': 4,
        'parentId': 3,
        'name_zh': '需求详情',
        'name_en': 'RequirementsInformation',
        'url': 'technicalRequiremenets/techReq',
        'type': 1,
        'icon': 'el-icon-menu',
        'orderNum': 1,
        'menuType': 0,
        'subMenuList': []
    }]
},
{
    'menuId': 5,
    'parentId': 0,
    'name_zh': '技术成果',
    'name_en': 'technologicalAchievements',
    'url': '',
    'type': 1,
    // 'icon': 'el-icon-info',
    'orderNum': 3,
    'menuType': 1,
    'subMenuList': [{
        'menuId': 6,
        'parentId': 5,
        'name_zh': '成果详情',
        'name_en': 'AchievementsInformation',
        'url': 'technologicalAchievements/techAch',
        'type': 1,
        // 'icon': 'el-icon-menu',
        'orderNum': 1,
        'menuType': 0,
        'subMenuList': []
    }]
},
    {
        'menuId': 7,
        'parentId': 0,
        'name_zh': '技术交易',
        'name_en': 'TechnologyTrading',
        'url': '',
        'type': 1,
        // 'icon': 'el-icon-info',
        'orderNum': 4,
        'menuType': 1,
        'subMenuList': [{
            'menuId': 8,
            'parentId': 7,
            'name_zh': '交易详情',
            'name_en': 'TradingInformation',
            'url': 'technologyTrading/techTrading',
            'type': 1,
            // 'icon': 'el-icon-menu',
            'orderNum': 1,
            'menuType': 0,
            'subMenuList': []
        }]
    },
    {
        'menuId': 9,
        'parentId': 0,
        'name_zh': '双创路演',
        'name_en': 'Roadshow',
        'url': '',
        'type': 1,
        // 'icon': 'el-icon-info',
        'orderNum': 5,
        'menuType': 1,
        'subMenuList': [{
            'menuId': 10,
            'parentId': 9,
            'name_zh': '路演详情',
            'name_en': 'RoadshowInformation',
            'url': 'roadShow/roadShow',
            'type': 1,
            // 'icon': 'el-icon-menu',
            'orderNum': 1,
            'menuType': 0,
            'subMenuList': []
        }]
    }
/*    {
    'menuId': 5,
    'parentId': 0,
    'name_zh': '数字化学习中心',
    'name_en': 'Help',
    'url': 'study/CloudCenter',
    'type': 1,
    'icon': 'el-icon-info',
    'orderNum': 1,
    'subMenuList': [{
        'menuId': 6,
        'parentId': 5,
        'name_zh': '百度',
        'name_en': 'Baidu',
        'url': 'https://www.baidu.com/',
        'type': 1,
        'icon': 'el-icon-menu',
        'orderNum': 1,
        'subMenuList': []
    }, {
        'menuId': 7,
        'parentId': 5,
        'name_zh': '博客',
        'name_en': 'Blog',
        'url': 'https://www.cnblogs.com/l-y-h/',
        'type': 1,
        'icon': 'el-icon-menu',
        'orderNum': 1,
        'subMenuList': []
    }]
}*/
]