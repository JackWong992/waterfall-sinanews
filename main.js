var curPage = 1
var perPageCount = 10
var colSumHeight = []
var nodeWidth = $('.item').outerWidth(true)
var colNum = parseInt($('#pic-ct').width()/nodeWidth)
for(var i = 0; i < colNum.length; i++){
	colSumHeight[i] = 0
}

var isDataArrive = true
start()
function start(){

	getData(function(newsList){
		console.log(newsList)
		isDataArrive = true
		$.each(newsList, function(idx, news){
			var $node = getNode(news)
			$node.find('img').load(function(){
				$('#pic-ct').append($node)
				console.log($node, 'loaded...')
				waterFallPlace($node)
			})
		})
	})
	isDataArrive = false	
}

$(window).scroll(function(){
	if(!isDataArrive) return
	
	if(isVisible($('#load'))){
		start()
	}
})

function getData(callback){
		$.ajax({
			url: 'http://platform.sina.com.cn/slide/album_tech',
			dataType: 'jsonp',   
			jsonp:"jsoncallback",
			data: {
				app_key: '1271687855',
				num: perPageCount,
				page: curPage
			}
		}).done(function(ret){
			if(ret && ret.status && ret.status.code === "0"){
				callback(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
				curPage++
			}else{
				console.log('get error data');
			}
		});
}

function getNode(item){
	var tpl = ''
		tpl += '<li class="item">';
		tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
		tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
		tpl += '<p class="desp">'+item.short_intro+'</p>';
		tpl += '</li>';
	
	return $(tpl)
}

function waterFallPlace($node){

		var idx = 0,
			  minSumHeight = colSumHeight[0];

		for(var i=0;i<colSumHeight.length; i++){
			if(colSumHeight[i] < minSumHeight){
				idx = i;
				minSumHeight = colSumHeight[i];
			}
		}

		$node.css({
			left: nodeWidth*idx,
			top: minSumHeight,
			opacity: 1
		});

		colSumHeight[idx] = $node.outerHeight(true) + colSumHeight[idx];
		$('#pic-ct').height(Math.max.apply(null,colSumHeight));

}
	function isVisible($el){
	  var scrollH = $(window).scrollTop(),
	  	  winH = $(window).height(),
	  	  top = $el.offset().top;

  	  if(top < winH + scrollH){
  	  	return true;
  	  }else{
  	  	return false;
  	  }
	}

	function checkShow(){
		if(isShow($('#load'))){
			loadAndPlace();
		}
	}
	function isShow($el){
	  var scrollH = $(window).scrollTop(),
	  	  winH = $(window).height(),
	  	  top = $el.offset().top;

  	  if(top < winH + scrollH){
  	  	return true;
  	  }else{
  	  	return false;
  	  }
	}
// 获取数据，并且摆放位置
  var curPage = 1,
		  perPageCount = 9;

	function loadAndPlace(){
		$.ajax({
			url: 'http://platform.sina.com.cn/slide/album_tech',
			dataType: 'jsonp',   //这里使用了新浪新闻的 jsonp 接口，大家可以直接看数据， 如： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
			jsonp:"jsoncallback",
			data: {
				app_key: '1271687855',
				num: perPageCount,
				page: curPage
			}
		}).done(function(ret){
			if(ret && ret.status && ret.status.code === "0"){
				place(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
				curPage++
			}else{
				console.log('get error data');
			}
		});
	}

function place(nodeList){
	console.log(nodeList);
	$.each(nodeList, function(index,item){
		var $node = getNode(item)
		$node.find('img').load(function(){
			$('#pic-ct').append($node)
			waterFallPlace($node)
		})
	})
}
// 瀑布流
var colSumHeight = [],
		nodeWidth = $('.item').outerWidth(true),
		colNum = parseInt($('#pic-ct').width()/nodeWidth);

for(var i=0; i<colNum; i++){
	colSumHeight.push(0)
}

function waterFallPlace($nodes){
	$nodes.each(function(){
		var $cur = $(this);
		//colSumHeight = [100, 250, 80, 200]

		var idx = 0,
			  minSumHeight = colSumHeight[0];
		for(var i=0;i<colSumHeight.length; i++){
			if(colSumHeight[i] < minSumHeight){
				idx = i;
				minSumHeight = colSumHeight[i];
			}
		}

		$cur.css({
			left: nodeWidth*idx,
			top: minSumHeight,
			opacity: 1
		});

		colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
		$('#pic-ct').height(Math.max.apply(null,colSumHeight));
	});

}

function getNode(item){
	var tpl = ''
		tpl += '<li class="item">';
		tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
		tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
		tpl += '<p class="desp">'+item.short_intro+'</p>';
		tpl += '</li>';	
	return $(tpl)
}
function renderData(items){
	var tpl = '',
		$nodes;
	for(var i = 0;i<items.length;i++){
		tpl += '<li class="item">';
		tpl += ' <a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
		tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
		tpl += '<p class="desp">'+items[i].short_intro+'</p>';
		tpl += '</li>';
	}
	$nodes = $(tpl);
	$('#pic-ct').append($nodes);
	return $nodes;
}