<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>创金启富</title>
    <link type="text/css" rel="stylesheet" href="<%=basePath%>/css/security.css">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

  </head>
  
  <body>
  
  <div class="block clearfix mgbot30 mgtop25">
	 
	     <div class="securityright borC8D2DC">
	        <div class="secotcontent fonts18" style="width: 652px;" id='secotcontent'> 
	       	 ${art.content }   
	        </div>
	  </div>
  </div>
  </body>
</html>
