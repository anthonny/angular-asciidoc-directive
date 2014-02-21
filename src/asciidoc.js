/**
 * angular-asciidoc-directive v0.0.1
 * (c) 2014 Anthonny Querouil  @anthonny_q
 * License: MIT
 */
 'use strict';

 angular.module('aql.asciidoc', []).
 	directive('asciidoc', function(){
		return {
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment header_footer
			link: function(scope, element, attrs) {
 				var options;
 				var transform = function(){};

 				// If options are define
				if (attrs.asciidocOpts) {
					options = scope.$eval(attrs.asciidocOpts);
				}

 				// If a transformer is define, use to complete link href or image src fro example
 				if (attrs.asciidocTransformer) {
 					transform = scope.$eval(attrs.asciidocTransformer);
 				}

				if (attrs.asciidoc) {
					scope.$watch(attrs.asciidoc, function (newVal) {
			            var html = newVal ? Opal.Asciidoctor.$render(newVal, options) : '';
			            element.html(html);
			            transform(element);
			          });
				} else {
					element.html(Opal.Asciidoctor.$render(element.text(), options));
				}

			}
		};
	});