const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
	
		
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
			</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;
