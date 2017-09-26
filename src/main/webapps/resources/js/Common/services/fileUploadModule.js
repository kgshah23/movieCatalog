angular.module('fileUploadModule', [ 'angularFileUpload' ]).factory(
		'FileService', ['FileUploader' , function(FileUploader) {
			return {
				uploadFile : function(url,method,auto,onSuccess,onError,onAfterAddingFile,onProgress,onFilter,onlyimage,allFiles){
					var uploader =  new FileUploader({
						url : url,
						method : method,
						autoUpload : auto,
					});
					
					console.log(onlyimage);
					if(allFiles != undefined){
						uploader.filters.push({name:"fileuploadfilter",fn:function(item){
							return true;
						}});
					}
					else{
						if(onlyimage == undefined){
	
						uploader.filters.push({name:"fileuploadfilter",fn:function(item){
							var isLess = (item.size <= (1024 * 1024 * 5));
							var isPdf = (item.type == "application/pdf");
							var isImage = (item.type.indexOf("image") >= 0);
							if(!(isLess && (isPdf || isImage))){
								if(onFilter != undefined){
									if(!onlyimage)
										onFilter(isLess && (isPdf || isImage));
									else
										onFilter(isLess && isImage);
								}
							}
	
							return (isLess && (isPdf || isImage));
						}});
						}else{
							uploader.filters.push({name:"fileuploadfilter",fn:function(item){
								var isLess = (item.size <= (1024 * 1024 * 5));
								var isImage = (item.type.indexOf("image") >= 0);
								
								if(!(isLess && isImage)){
									if(onFilter != undefined){
											onFilter(isLess &&isImage);
									}
								}
								return isLess && isImage;
							}});						
						}
				}

					
					uploader.onSuccessItem = onSuccess;
					
					uploader.onErrorItem = onError;
					
					uploader.onProgressItem = onProgress;
					uploader.onAfterAddingFile = onAfterAddingFile;
					
					return uploader;
				}
			};
		} ]);