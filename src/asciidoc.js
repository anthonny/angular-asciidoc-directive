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
 				var transform;
 				var nowatch;
 				var watch;

 				// If options are define
				if (attrs.asciidocOpts) {
					options = scope.$eval(attrs.asciidocOpts);
				}

				// If nowatch is define
				if (attrs.asciidocNoWatch) {
					nowatch = scope.$eval(attrs.asciidocNoWatch);
				}

				if (attrs.asciidoc) {
					watch = scope.$watch(attrs.asciidoc, function (newVal) {
						if (newVal) {
				            var html = Opal.Asciidoctor.$render(newVal, options);
				            element.html(html);

				            // If a postProcessor is define, use to complete link href or image src for example
			 				if (attrs.asciidocPostProcessor) {
			 					transform = scope.$eval(attrs.asciidocPostProcessor);
			 					transform(element);
			 				}

			 				// Stop watching value
			 				if (nowatch) {
				            	watch();
				            }	
				            
						}
			          });
				} else {		
					element.html(Opal.Asciidoctor.$render(element.text(), options));

		            // If a postProcessor is define, use to complete link href or image src for example
	 				if (attrs.asciidocPostProcessor) {
	 					transform = scope.$eval(attrs.asciidocPostProcessor);
	 					transform(element);
	 				}
				}

			}
		};
	});