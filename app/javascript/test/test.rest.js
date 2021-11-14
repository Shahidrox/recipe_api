"use strict";

const expect = require("chai").expect;
const yaml = require('js-yaml');
const fs = require('fs');


let chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();

let env;
try {
    env = yaml.safeLoad(fs.readFileSync('env.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

let BASE_URL = env.BASE_URL;
let POST_RECIPE_PATH    = "/recipes";
let GET_ALL_RECIPE_PATH = "/recipes";
let GET_ONE_RECIPE_PATH = "/recipes/";
let UPDATE_RECIPE_PATH  = "/recipes/";
let DELETE_RECIPE_PATH  = "/recipes/";


let recipeList = [];

describe("", () => {
  describe('[Basic Case] /POST recipes:', () => {
    it('Cannot create a recipe if the request doesn’t have all the required parameters.', (done) => {
      let recipe = {
      }
      chai.request(BASE_URL)
      .post(POST_RECIPE_PATH)
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Recipe creation failed!');
        done();
      });
    });
    it('Can create a recipe.', (done) => {
      let recipe = {
        "title": "Tomato Soup",
        "making_time": "15 min",
        "serves": "5 people",
        "ingredients": "onion, tomato, seasoning, water",
        "cost": 450
      }
      chai.request(BASE_URL)
      .post(POST_RECIPE_PATH)
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Recipe successfully created!');
        res.body.should.have.property('recipe').be.a('Array');
        res.body.recipe.length.should.eql(1);
        done();
      });
    });
  });

  describe('[Basic Case] /GET recipes:', () => {
    it('Can get all of the recipes.', (done) => {
      chai.request(BASE_URL)
      .get(GET_ALL_RECIPE_PATH)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        for (let i=0; i < res.body.recipes.length; i++) {
          expect(res.body.recipes[i]).to.have.property('id');
          recipeList.push(res.body.recipes[i]);
        }
        done();
      });
    });
  });

  describe('[Basic Case] /GET/{id} recipe:', () => {
    it('Can get the recipe with the selected id.', (done) => {
      const targetId = (recipeList.length > 0 ? recipeList[0].id : 1);
      chai.request(BASE_URL)
      .get(GET_ONE_RECIPE_PATH + targetId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Recipe details by id');
        res.body.should.have.property('recipe').be.a('Array');
        res.body.recipe.length.should.eql(1);
        const targetRecipe = (recipeList.length > 0 ? recipeList[0] : res.body.recipe[0]);
        res.body.recipe[0].should.have.property('id').eql(targetRecipe.id);
        res.body.recipe[0].should.have.property('title').eql(targetRecipe.title);
        res.body.recipe[0].should.have.property('serves').eql(targetRecipe.serves);
        res.body.recipe[0].should.have.property('ingredients').eql(targetRecipe.ingredients);
        res.body.recipe[0].should.have.property('cost').eql(targetRecipe.cost);
        done();
      });
    });
  });

  describe('[Basic Case] /PATCH/{id} recipe:', () => {
    it('Can update recipe.', (done) => {
      const recipe = {
        "title": "Rice Omelette",
        "making_time": "20 min",
        "serves": "7 people",
        "ingredients": "onion, egg, seasoning, soy sauce",
        "cost": 400
      }
      const targetId = (recipeList.length > 0 ? recipeList[0].id : 1);
      chai.request(BASE_URL)
      .patch(UPDATE_RECIPE_PATH + targetId)
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });

  describe('[Basic Case] /DELETE/{id} recipe:', () => {
    it('Can delete recipe.', (done) => {
      const targetId = (recipeList.length > 0 ? recipeList[0].id : 1);
      chai.request(BASE_URL)
      .delete(DELETE_RECIPE_PATH + targetId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });
});