<html>
	<head>
        <title>Hardware Documentation</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	</head>

	<body>
		<div id="contentdiv">
			2010
		</div>
		<script>
			var i = 0;
			$('#contentdiv').click(function () {
				i+=1;
				$(this).append('<br>'+ i);
				if (i % 3 === 0) {
					$(this).append('fizz');
				}
				if (i % 5 === 0) {
					$(this).append('buzz');
				}
			});
		</script>
	</body>
</html>