package com.springct.movieCatalog.dao;

import org.springframework.stereotype.Repository;

import com.springct.movieCatalog.exception.MovieCatalogException;
import com.springct.movieCatalog.request.beans.CreateMovieCatalogRequest;
import com.springct.movieCatalog.request.beans.MovieCatalogListRequest;
import com.springct.movieCatalog.request.beans.UpdateMovieCatalogRequest;

@Repository
public class MovieDaoImpl implements MovieDao {

	@Override
	public void createMovieCatalog(CreateMovieCatalogRequest createMovieCatalogRequest) throws MovieCatalogException {
		//TODO: Add DAO SQL logic to create movie
		
	}

	@Override
	public void updateMovieCatalog(UpdateMovieCatalogRequest updateMovieCatalogRequest) throws MovieCatalogException {
		//TODO: Add DAO SQL logic to create movie
		
	}

	@Override
	public void listgetMovieCatalog(MovieCatalogListRequest movieCatalogListRequest) throws MovieCatalogException {
		//TODO: Add DAO SQL logic to create movie
		
	}

	
}
