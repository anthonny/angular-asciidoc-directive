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

 				// If options are define
				if (attrs.asciidocOpts) {
					options = scope.$eval(attrs.asciidocOpts);
				}

				if (attrs.asciidoc) {
					scope.$watch(attrs.asciidoc, function (newVal) {
			            var html = newVal ? Opal.Asciidoctor.$render(newVal, options) : '';
			            element.html(html);
			          });
				} else {
					element.html(Opal.Asciidoctor.$render(element.text(), options));
				}

			}
		};
	});