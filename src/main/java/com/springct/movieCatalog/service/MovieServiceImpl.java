package com.springct.movieCatalog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springct.movieCatalog.dao.MovieDao;
import com.springct.movieCatalog.exception.MovieCatalogException;
import com.springct.movieCatalog.request.beans.CreateMovieCatalogRequest;
import com.springct.movieCatalog.request.beans.MovieCatalogListRequest;
import com.springct.movieCatalog.request.beans.UpdateMovieCatalogRequest;

@Service
public class MovieServiceImpl implements MovieService {
	
	@Autowired
	MovieDao movieDao;

	/**
	 * Service to create a movie catalog
	 */
	@Override
	public void createMovieCatalog(CreateMovieCatalogRequest createMovieCatalogRequest) throws MovieCatalogException {
		movieDao.createMovieCatalog(createMovieCatalogRequest);		
	}

	/**
	 * Service to update movie catalog
	 */
	@Override
	public void updateMovieCatalog(UpdateMovieCatalogRequest updateMovieCatalogRequest) throws MovieCatalogException {
		movieDao.updateMovieCatalog(updateMovieCatalogRequest);
	}

	/**
	 * Service to get list of movie catalog
	 */
	@Override
	public void listgetMovieCatalog(MovieCatalogListRequest movieCatalogListRequest) throws MovieCatalogException {
		movieDao.listgetMovieCatalog(movieCatalogListRequest);
	}
	
	
}
