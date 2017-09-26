define(['angular'], function(angular){
    return ['$document',

			function($document) {
				return {
					restrict : 'EA',
					replace : true,
					scope : {
						onmove : '=onmove',
						scope : '=scope'
					},
					link : function(scope, element, attr) {
						var startX = 0, startY = 0, x =  scope.$parent.$parent.$parent.offset, y =  scope.$parent.$parent.$parent.yoffset;
						var width = 36;
						var height = 36;
						var out = false;
						var outX = 0;
						var outY = 0;
						
						var newDevice = true;
						if(scope.scope.device.xAxis != 0){
							x = scope.scope.device.xAxis;
							startX = x;
							newDevice = false;
						}
						if(scope.scope.device.yAxis != 0){
							y = scope.scope.device.yAxis;
							startY = y;
							newDevice = false;
						}

						
						
						
						
						
						console.log(scope);
						
						element.css({
							position : 'absolute',
							cursor : 'pointer',
							left : x+"px",
							top : y+"px"
						});
						
						if(newDevice)
							scope.$parent.$parent.$parent.offset += width;

						
						element.on('mousedown',
								function(event) {
									// Prevent default dragging
									// of selected
									// content
									if(scope.$parent.$parent.$parent.devicesPositionEditable){
										event.preventDefault();
										startX = event.pageX - x;
										startY = event.pageY - y;
										console.log("down");
										$document.on('mousemove',
												mousemove);
										$document.on('mouseup',
												mouseup);
									}
								});

						function mousemove(event) {
							if(scope.$parent.$parent.$parent.devicesPositionEditable){
								console.log("true");
								y = event.pageY - startY;
								x = event.pageX - startX;
								/*if (y > -1 && y < maxHeight
										&& x > -1 && x < maxWidth) {
									scope.scope.device.xAxis = x;
									scope.scope.device.yAxis = y;
									element.css({
										top : y + 'px',
										left : x + 'px'
									});
								}*/
								
								if(x > maxWidth-width){
									scope.$parent.$parent.$parent.offset = 0;
									scope.$parent.$parent.$parent.yoffset += width;
//									y+= scope.$parent.$parent.$parent.yoffset;
									console.log("___________________++++ X :" + x + "y :" + y);
								}
								
								if(scope.scope.$parent.$parent.location.mapImage != null){
									var maxWidth = angular.element(document
											.querySelector('#floorMap'+scope.scope.$parent.$parent.location.id))[0].width
											- width;
									var maxHeight = angular
											.element(document
													.querySelector('#floorMap'+scope.scope.$parent.$parent.location.id))[0].height
											- height;
								}else{
									var maxWidth = angular.element(document
											.querySelector('#nofloormap'))[0].width
											- width;
									var maxHeight = angular
											.element(document
													.querySelector('#nofloormap'))[0].height
												- height;
										console.log("scopin");
									console.log(maxWidth);
								}
								
								scope.scope.device.xAxis = x;
									//scope.scope.device.yAxis = y;
								console.log(element);
								element.css({
										top : y + 'px',
										left : x + 'px'
								});
								
								if(y > maxHeight)
								{
									y = maxHeight - 1;
									element.css({
										top : y + 'px',
									});
								}
								if(y <= -1)
								{
									y = 0;
									element.css({
										top : y + 'px',
									});
								}
								if(x > maxWidth)
								{
									x = maxWidth - 1;
									element.css({
										left : x + 'px'
									});
								}
								if(x <= -1)
								{
									x = 0;
									element.css({
										left : x + 'px'
									});
								}
								element.css({
									top : y + 'px',
									left : x + 'px'
							});
								scope.scope.device.xAxis = x;
								scope.scope.device.yAxis = y;
								scope.$parent.$parent.$parent.saveDisabled = true;
								
								console.log(maxWidth);
								scope.onmove(scope.scope);
							}

						}

						function mouseup() {
							if(scope.$parent.$parent.$parent.devicesPositionEditable){
								scope.$parent.$parent.saveCancelDevicesEnabled = true;
								console.log("mouse up");
								scope.$parent.$parent.$parent.saveDisabled = true;
								$document.unbind('mousemove',
										mousemove);
								$document
										.unbind('mouseup', mouseup);
							}
						}
					}

				};
			}];
});
