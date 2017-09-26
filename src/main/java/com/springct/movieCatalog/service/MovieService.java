package com.springct.movieCatalog.service;

import com.springct.movieCatalog.exception.MovieCatalogException;
import com.springct.movieCatalog.request.beans.CreateMovieCatalogRequest;
import com.springct.movieCatalog.request.beans.MovieCatalogListRequest;
import com.springct.movieCatalog.request.beans.UpdateMovieCatalogRequest;

public interface MovieService {

	void createMovieCatalog(CreateMovieCatalogRequest createMovieCatalogRequest) throws MovieCatalogException;

	void updateMovieCatalog(UpdateMovieCatalogRequest updateMovieCatalogRequest) throws MovieCatalogException;

	void listgetMovieCatalog(MovieCatalogListRequest movieCatalogListRequest) throws MovieCatalogException;

}
