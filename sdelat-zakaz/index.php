<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Сделать заказ");
?>

<?
    $APPLICATION->IncludeComponent(
	"liftMain:appForm", 
	".default", 
	array(
		
	),
	false
);
?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>