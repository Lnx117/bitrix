<?
$data = '';
if($_REQUEST){
	$data = $_REQUEST;
}
if( !isset($_REQUEST['ajax_component_name'])
	|| !($compname = str_replace(':', '/', preg_replace('/[^a-zA-Z0-9_.:]/', '', $_REQUEST['ajax_component_name'])))
	) die('0x1'.json_encode($_REQUEST));
if( file_exists(dirname(__FILE__).'/local/components/'.$compname.'/ajax.php') )
	$incpath = dirname(__FILE__).'/local/components/'.$compname.'/ajax.php';
elseif( file_exists(dirname(__FILE__).'/bitrix/components/'.$compname.'/ajax.php') )
	$incpath = dirname(__FILE__).'/bitrix/components/'.$compname.'/ajax.php';
elseif(file_exists(dirname(__FILE__).'/local/templates/'. explode('/', $compname)[0].'/components/bitrix/'.explode('/', $compname)[1].'/.default/ajax.php'))
	$incpath = dirname(__FILE__).'/local/templates/'. explode('/', $compname)[0].'/components/bitrix/'.explode('/', $compname)[1].'/.default/ajax.php';
else
	die('0x2');
header('Access-Control-Allow-Origin: *');

if(!in_array($compname, ['portfolio/lk.antiplagiat', 'webrise/lk.profile.hire'])) {
	define('BX_SECURITY_SESSION_READONLY', true);
}
define("NO_KEEP_STATISTIC", true);
define("NO_AGENT_STATISTIC", true);
require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/include/prolog_before.php');

if(isset($_REQUEST['ajax_dump']))
	var_dump($_REQUEST);
else
	include $incpath;