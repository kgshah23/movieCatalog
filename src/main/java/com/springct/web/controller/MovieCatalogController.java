package com.springct.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springct.model.GenericListResponseBean;
import com.springct.model.ResponseBean;
import com.springct.movieCatalog.exception.MovieCatalogException;
import com.springct.movieCatalog.request.beans.CreateMovieCatalogRequest;
import com.springct.movieCatalog.request.beans.MovieCatalogListRequest;
import com.springct.movieCatalog.request.beans.UpdateMovieCatalogRequest;
import com.springct.movieCatalog.response.beans.InventoryDetailResponse;
import com.springct.movieCatalog.service.MovieService;

@RestController
@RequestMapping(value = "/api")
public class MovieCatalogController {

	@Autowired
	MovieService movieService;

	/**
	 * Rest method to check if REST is working
	 * @return
	 * @throws MovieCatalogException
	 */
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	@ResponseBody
	public ResponseBean testRest() {

		return ResponseBean.sendSuccessResponseBean(null);
	}

	
	/**
	 * Service to create 
	 * @param createMovieCatalogRequest
	 * @return
	 * @throws MovieCatalogException
	 */
	@RequestMapping(value = "/moviecatalog", method = RequestMethod.POST)
	@ResponseBody
	public ResponseBean createMovieCatalog(@RequestBody CreateMovieCatalogRequest createMovieCatalogRequest)
			throws MovieCatalogException {

		createMovieCatalogRequest.validateRequest();
		movieService.createMovieCatalog(createMovieCatalogRequest);
		
		return ResponseBean.sendSuccessResponseBean(null);
	}

	@RequestMapping(value = "/moviecatalog/{inventoryId}", method = RequestMethod.PUT)
	public ResponseBean updateMovieCatalog(@PathVariable Long inventoryId,
			@RequestBody UpdateMovieCatalogRequest updateMovieCatalogRequest) throws MovieCatalogException {

		updateMovieCatalogRequest.validateRequest();
		movieService.updateMovieCatalog(updateMovieCatalogRequest);
		
		return ResponseBean.sendSuccessResponseBean(null);
	}

	@RequestMapping(value = "/moviecatalogs", method = RequestMethod.POST)
	@ResponseBody
	public ResponseBean getMovieCatalog(@RequestBody MovieCatalogListRequest movieCatalogListRequest)
			throws MovieCatalogException {
		movieCatalogListRequest.validateRequest();
		GenericListResponseBean<InventoryDetailResponse> inventories = null;

		//Call service layer to get a moviecatalogs entry
		movieService.listgetMovieCatalog(movieCatalogListRequest);
		return ResponseBean.sendSuccessResponseBean(inventories);
	}



}
