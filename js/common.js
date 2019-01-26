$(function() {
	var jsonName = "panels.json"
	var parentDiv = document.getElementById('input-panel');
	var likeArray = [];
	var likeIndex;
	var like;
  GetJsonInfo(jsonName);

    function GetJsonInfo(name){
		  $.getJSON( name, {
		    format: "json"
		  })
		  .done(function(data){
		  	data.forEach(function(item,i){
		  		NewPanel(item);
		  		likeArray.push(item.likes);
		  	})
		  })
  }
  function NewPanel(item){
  	var panel = document.createElement('div');
  	panel.className = "panels-overlay-panel"
  	var wrappImg = document.createElement('div');
  	wrappImg.className = "wrapp-img";

  	var img = document.createElement('img');
  	img.setAttribute('src','img/panels/'+ item.img + '.jpg');
  	wrappImg.appendChild(img);

  	var wrappPanelInfo = document.createElement('div');
  	wrappPanelInfo.className = "panels-overlay-panel-wrapp";

  	var panelText = document.createElement('h3');
  	panelText.innerHTML = item.text;

  	var wrappControlsPanel = document.createElement('div');
  	wrappControlsPanel.className = "panels-overlay-panel-wrapp__controls";

  	var imgView = document.createElement('img');
  	imgView.setAttribute('src','img/icons/if_eye_118676 (1).png');
  	var view = document.createElement('span');
  	view.innerHTML = item.view;

  	var imgLike = document.createElement('img');
  	imgLike.setAttribute('src','img/icons/if_heart-01_186400.png');
  	imgLike.className = "like";
  	imgLike.addEventListener("click",handler);
  	like = document.createElement('span');
  	like.innerHTML = item.likes;
  	panel.appendChild(wrappImg);
  	wrappPanelInfo.appendChild(panelText);
  	if (item.tags) {
  		item.tags.forEach(function(item,i){
  			var panelTags = document.createElement('a');
  			panelTags.setAttribute('href','#');
  			panelTags.innerHTML = item + ' ';
  			wrappPanelInfo.appendChild(panelTags);
  		})
  	}
  	wrappControlsPanel.appendChild(imgView);
  	wrappControlsPanel.appendChild(view);
  	wrappControlsPanel.appendChild(imgLike);
  	wrappControlsPanel.appendChild(like);
  	wrappPanelInfo.appendChild(wrappControlsPanel)
  	panel.appendChild(wrappPanelInfo);

  	parentDiv.appendChild(panel)
  }
  var handler = function(element){
        var e = e || element;
		var target = element.target || e.srcElement;
		if (target.className == 'like') {
			var increment = parseInt(target.nextSibling.innerHTML);
			increment += 1;
			target.nextSibling.innerHTML = increment;
			likeIndex = index(target, document.getElementsByClassName('like'));
			for (var i = 0; i <= likeArray.length - 1; i++) {
				if (likeIndex == i) {
					likeArray[i] += 1;
				}
			}
			target.removeEventListener('click',handler);
		}
  	};
 function index(element, collection) {
		var len = collection.length;
		for (var i = 0; i < len; i++) {
			if (element == collection[i]) {
				return i;
			}
		}
	}

});
