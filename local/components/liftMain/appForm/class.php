<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

class AppForm extends CBitrixComponent
{
	/**
	 * Функция вызова компонента
	 */
    public function executeComponent()
	{
        $this->includeComponentTemplate();
	}
}