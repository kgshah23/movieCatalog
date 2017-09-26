package com.springct.movieCatalog.dao;

import com.springct.movieCatalog.exception.MovieCatalogException;
import com.springct.movieCatalog.request.beans.CreateMovieCatalogRequest;
import com.springct.movieCatalog.request.beans.MovieCatalogListRequest;
import com.springct.movieCatalog.request.beans.UpdateMovieCatalogRequest;

public interface MovieDao {

	void createMovieCatalog(CreateMovieCatalogRequest createMovieCatalogRequest) throws MovieCatalogException;

	void updateMovieCatalog(UpdateMovieCatalogRequest updateMovieCatalogRequest) throws MovieCatalogException;

	void listgetMovieCatalog(MovieCatalogListRequest movieCatalogListRequest) throws MovieCatalogException;

}
