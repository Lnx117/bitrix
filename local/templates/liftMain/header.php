<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php 
    use Bitrix\Main\Page\Asset;
?>
<!--A Design by W3layouts
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<head>
    <?php $APPLICATION->ShowHead(); ?>
    <title><?php $APPLICATION->ShowTitle(); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <?php 
    Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/style.css');
    // Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/style-vue.css');
    // Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/bootstrap_ranepa.css');

    Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/jquery-1.11.1.min.js');
    Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/vue@2.7.14.dev.js');
	// Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/vue-components-v1.js');
    

    Asset::getInstance()->addString('<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
    Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">');
    Asset::getInstance()->addString("<link href='//fonts.googleapis.com/css?family=Audiowide' rel='stylesheet' type='text/css'>");
    Asset::getInstance()->addString("<link href='//fonts.googleapis.com/css?family=Monda' rel='stylesheet' type='text/css'>");
    ?>
</head>
<body>
    <div id="panel"><?php $APPLICATION->ShowPanel(); ?></div>
    <div class="header">
    <div class="header_top">
        <div class="wrap">
        <div class="header-top-left">
                <div class="logo">
                    
                </div>
                <?$APPLICATION->IncludeComponent("bitrix:menu", "main", Array(
                    "ALLOW_MULTI_SELECT" => "N",	// Разрешить несколько активных пунктов одновременно
                        "CHILD_MENU_TYPE" => "left",	// Тип меню для остальных уровней
                        "DELAY" => "N",	// Откладывать выполнение шаблона меню
                        "MAX_LEVEL" => "1",	// Уровень вложенности меню
                        "MENU_CACHE_GET_VARS" => array(	// Значимые переменные запроса
                            0 => "",
                        ),
                        "MENU_CACHE_TIME" => "3600",	// Время кеширования (сек.)
                        "MENU_CACHE_TYPE" => "N",	// Тип кеширования
                        "MENU_CACHE_USE_GROUPS" => "Y",	// Учитывать права доступа
                        "ROOT_MENU_TYPE" => "main",	// Тип меню для первого уровня
                        "USE_EXT" => "N",	// Подключать файлы с именами вида .тип_меню.menu_ext.php
                    ),
                    false
                );?>
        <div class="clear"></div>
    </div>

    <div class="header-top-right">
                <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <!--------------------- Main Content ------------------->
    <div class="wrap">
        <div class="main">
            <div class="content">