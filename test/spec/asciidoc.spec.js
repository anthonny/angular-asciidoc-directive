'use strict';
describe('Asciidoc Directive', function () {
	
	var element;
	var $scope;
	var listTest=[];

	// Load aql.asciidoc module
	beforeEach(module('aql.asciidoc'));

	function compileDirective(html) {
        inject(function($compile) {
            var element = $compile(html)($scope);
        });
        // $digest is necessary to finalize the directive generation
        $scope.$digest();
    }

	//
	beforeEach(inject(function ($compile, $rootScope) {
		$scope = $rootScope.$new();
		$scope.asciidocOpts = Opal.hash2(['options'], {'header_footer': true});

		$scope.asciiPostProcessor = function(element) {
			element.append('<p>Transformed</p>');
			return element;
		}


		element = angular.element("<div asciidoc='asciiModel' asciidoc-opts='asciidocOpts' asciidoc-post-processor='asciiPostProcessor'> </div>");
		$compile(element)($scope);
	}));

	listTest.push({
		element: 'h1',
		asciival: '= Test',
		expect: '<h1>Test</h1>\n'+
				'<p>Transformed</p>'
	});

	listTest.push({
		element: 'h2',
		asciival: '== Test',
		expect: '<div class="sect1">\n'+
				'<h2 id="_test">Test</h2>\n' +
				'<div class="sectionbody">\n\n' +
				'</div>\n'+
				'</div>\n\n'+
				'<p>Transformed</p>'
	});

	listTest.push({
		element: 'paragraph',
		asciival: 'Paragraph',
		expect: '<div class="paragraph">\n'+
				'<p>Paragraph</p>\n' +
				'</div>\n\n'+
				'<p>Transformed</p>'
	});

	listTest.forEach(function(test) {
		it('should display ' + test.element, function (done) {
			$scope.asciiModel = test.asciival;
			$scope.$digest();
			expect(element.html()).toBe(test.expect);
		});
	});
});