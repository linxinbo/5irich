<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>理财易站-国内最简单快捷的智能理财平台</title>
    <meta name="keywords" content="基金,基金理财,基金公司,个人理财,家庭理财,基金推荐,基金排名,精品基金,工薪阶层理财,理财方案,网上理财,第三方理财"/>
    <meta name="description" content="理财易站为用户精选各大基金公司的基金产品,为您提供个人理财、家庭理财、工薪阶层理财等理财方案,打造简单快捷的智能第三方投资理财平台！"/>
    <meta name="renderer" content="webkit">
    <link type="text/css" rel="stylesheet" href="<%=basePath%>style/article/article-cont.css">
    <link rel="shortcut icon" href="<%=basePath%>images/favicon.ico"/>
    <link rel="stylesheet" href="<%=basePath%>style/bootstrap.min.css">
    <link rel="stylesheet" href="<%=basePath%>common/common.css">
    <link rel="stylesheet" href="<%=basePath%>style/header/header.css">
    <link rel="stylesheet" href="<%=basePath%>style/footer/footer.css">
    <link rel="stylesheet" href="<%=basePath%>style/login/login.css">
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  <body>
  <header class="cheader" id="home-cheader">
  <div class="logo clearfix">
  <div class="col-xs-6">
  <img src="<%=basePath%>/images/header/LOGO.png" class="clogo">
  </div>
  <div class="col-xs-6">
  <div class="menu">
  <a href="<%=basePath%>home.html"><span class="select">首页</span></a>
  <a id="short_f"><span>基金优选</span><i></i></a>
  <a href="<%=basePath%>fund/fund_advance.html"><span>高端理财</span></a>
  <a id="assets"><span>我的资产</span></a>
  <div class="short_f" style="display:none">
  <a href="<%=basePath%>fund/fundrecomm.html">精选基金</a>
  <a href="<%=basePath%>fund/fund_theme.html">主题基金</a>
  <a href="<%=basePath%>fund/fund_all.html">所有基金</a>
  <%--<a href="<%=basePath%>pcweb/fund/chuangfu.html">短期理财</a>--%>
  </div>
  </div>
  <div class="Sign">
  <a id="register">注册</a> <a style="font-weight: bold;padding: 0 5px;"> · </a> <a id="login">登录</a>
  </div>
  <div class="login-back">
  <a id="login-back">退出</a><a style="font-weight: bold;padding: 0 5px;"></a> <a class="user-name"></a>
  </div>
  </div>
  </div>
  </header>
  <aside class="home-side">
  <ul>

  <li>
  <div>
  <span class="home-side-icon"></span>
  <span class="home-side-write home-side-code">手机<br />金融</span>
  </div>
  </li>
  <li>
  <div>
  <span class="home-side-icon"></span>
  <span class="home-side-write home-side-phone">业务<br />咨询</span>
  </div>
  </li>
  <li>
  <div class="home-side-server">
  <span class="home-side-icon"></span>
  <span class="home-side-write">在线<br />客服</span>
  </div>
  </li>
  <li class="home-backtop" id="home-backtop">
  <div>
  <span class="home-side-icon"></span>
  <span class="home-side-write">返回<br />顶部</span>
  </div>
  </li>
  <img src="../images/home/home-side-code.png" alt="error" class="home-img-code">
  <img src="../images/home/home-side-write.png" alt="error" class="home-img-write">
  </ul>
  </aside>
  <div class="art-cont">
	${art.content }
  </div>
  <div class="home-layer"></div>
  <div id="login-cont"></div>
  <div id="register-cont"></div>
  <div id="forget-pass"></div>
  <footer class="footer clearfix">
  <div class="Company clearfix">
  <ul>
  <li class="col-xs-2"><a class="line"><img src="<%=basePath%>images/footer/zj1.jpg"></a><span>基金销售资格</span></li>
  <li class="col-xs-2"><a class="line"><img src="<%=basePath%>images/footer/zj2.jpg"></a><span>中国证券业协会会员资格</span></li>
  <li class="col-xs-2"><a class="line"><img src="<%=basePath%>images/footer/zj3.jpg"></a><span>私募投资基金管理人资格</span></li>
  <li class="col-xs-2"><a class="line"><img src="<%=basePath%>images/footer/dw.jpg"></a><span>监管机构</span></li>
  <li class="col-xs-2"><a class="line"><img src="<%=basePath%>images/footer/dw1.jpg"></a><span>自律机构</span></li>
  <li class="col-xs-2"><a ><img src="<%=basePath%>images/footer/dw2.jpg"></a><span>资金监管银行</span></li>
  </ul>

  </div>
  <div class="Contactus clearfix">
  <div class="jieshao clearfix">
  <div class="col-xs-5">
  <ul>
  <li class="col-xs-4">
  <a>关于我们</a>
  <a href="<%=basePath%>aboutus/about.html#1">公司介绍</a>
  <a href="<%=basePath%>aboutus/about.html#1">产品与服务</a>
  <a href="<%=basePath%>aboutus/about.html#3">资质荣誉</a>
  <a href="<%=basePath%>aboutus/about.html#4">核心团队</a>
  <a href="<%=basePath%>aboutus/about.html#5">合作伙伴</a>
  <a href="<%=basePath%>aboutus/about.html#6">联系我们</a>
  </li>
  <li class="col-xs-4">
  <a>安全保障</a>
  <a href="<%=basePath%>anquan/anquan.html#1">交易安全</a>
  <a href="<%=basePath%>anquan/anquan.html#2">信息安全</a>
  <a href="<%=basePath%>anquan/anquan.html#3">网站安全</a>
  <!--<a>免责申明</a>-->

  </li>
  <li class="col-xs-4">
  <a>更多链接</a>
  <a href="<%=basePath%>assets/assets.html">网上交易</a>
  <a>新手指南</a>
  </li>
  </ul>
  </div>
  <div class="col-xs-7">
  <div class="wxh">
  <div class="wxh_text">扫描二维码，关注理财易站官方微信，指尖理财  So easy</div>
  <div class="weixin" style="margin-right: 70px;">
  <a><img src="<%=basePath%>images/footer/fwh.png"></a>
  <span>服务号</span>
  <span>在线客服 智能投顾</span>
  </div>
  <div class="weixin">
  <a><img src="<%=basePath%>images/footer/dyh.png"></a>
  <span>订阅号</span>
  <span>传达资讯 独家策略</span>
  </div>
  </div>
  <div class="contact">
  <div class="phone">
  <i></i><span>免费客服热线:</span>
  </div>
  <a class="haoma">400-6262-818</a>
  <a class="kefu">在线客服</a>
  </div>

  </div>
  <div class="col-lg-12 beian">
  京ICP备16042119&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;基金销售业务资格许可证号：000000315&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;中国民生银行全程提供资金监管<br>版权所有 c 2014 北京创金启富投资管理有限公司
  </div>
  </div>

  </div>

  </footer>
  </body>
  <script src="<%=basePath%>js/jquery.js"></script>
  <script src="<%=basePath%>js/Plug-in/jquery.cookie.js"></script>
  <script src="<%=basePath%>common/common.js"></script>
  <script src="<%=basePath%>js/home/home.js"></script>
  <script src="../js/Plug-in/scrolltopcontrol.js"></script>
</html>
