<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

$this->setFrameMode(true);
?>

<?foreach($arResult["ITEMS"] as $arItem):?>
	<div class="box1">
			<h3><a href="<?= $arItem['DETAIL_PAGE_URL'] ?>"><?= $arItem['NAME'] ?></a></h3>
			<span>By <?= $arItem['PROPERTIES']['AUTHOR']['VALUE'] ?></span> 
		<div class="view">
			<div class="view-back">
				<span class="views" title="views">(<?= $arItem['SHOW_COUNTER'] ?:0 ?>)</span>
				<a href="<?= $arItem['DETAIL_PAGE_URL'] ?>"> </a>
			</div>
			<a href="single.html"><img src="<?= $arItem['PREVIEW_PICTURE']['SRC'] ?>"></a>
		</div>
		<div class="data">
			<p><?= $arItem['PREVIEW_TEXT'] ?></p>
			<span><a href="<?= $arItem['DETAIL_PAGE_URL'] ?>">Continue reading >>></a></span>
		</div>
	<div class="clear"></div>
	</div>
<?endforeach;?>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<br /><?=$arResult["NAV_STRING"]?>
<?endif;?>
</div>
