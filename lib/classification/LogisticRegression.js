Classification.LogisticRegression = function (theta, theta1, alpha, iterations) {
	this.initial_theta = [theta, theta1];
	this.alpha = alpha;
	this.iterations = iterations;

	this.train = function (X, Y) {
		this.theta = this.initial_theta;
		this.hypothesis = [];
		this.theta_history = [];
		this.gradientDescent(X, Y);
		return true;
	};

	this.predict = function (x) {
		var predictions = 0;
		for (var j=0; j<x.length; j++) {
			predictions += this.sigmoid(x[j] * this.theta[j]);
		}

		return ( (predictions/x.length) > .5) ? 1 : 0 ;
	}

	this.sigmoid = function (x) {
		return 1.0 / (1.0 + Math.exp(-x));
	};

	this.computeCost = function (theta, x, y)
	{
		theta = theta;
		for (var i=2; i<x.length; i++) {
			theta[i] = theta[1];
		}

		var J = 0, h = 0;
		for (var k=0; k<x.length; k++)
		{
			h += this.sigmoid(x[k] * theta[k]);
		}

		return h/x.length;
	}

	this.buildTheta = function (features) {
		for (var i=2; i<features; i++) {
			this.initial_theta[i] = this.initial_theta[1];
		}
	}

	this.gradientDescent = function (X, Y) {

		this.buildTheta(X.length);

		// compute one step of gradient descent for each iteration
		for (var i=1; i<this.iterations+1; i++) {

			// this will hold theta values for each feature at each step
			var temp = [];
			this.theta_history[i] = [];

			// compute cost of each feature
			for (var j=0; j<X.length; j++)
			{
				var x = X[j];
				var y = Y[j];
				var J = 0, h = 0;

				// calculate sum of all pedictions
				for (var k=0; k<x.length; k++)
				{
					h += this.sigmoid(x[k] * this.theta[k]);
					J += (-1*y) * Math.log(h) - (1-y) * Math.log(1-h);
				}

				var grad = [], cost = [];
				for (var k=0; k<x.length; k++) {
					// compute partial derivitve for this feature / step
					cost[k] = (h-y) * x[k];
					var delta = (1/Y.length) * cost[k];

					// save theta value for this feature
					temp[k] = this.theta[k] - (this.alpha * delta);
				}

				this.hypothesis[j] = h;
				var costAtStep = this.computeCost(this.theta, x, y);
				this.theta_history[i] = costAtStep;
			}

			// update theta values at this step
			this.theta = temp;
		}
	};
};
