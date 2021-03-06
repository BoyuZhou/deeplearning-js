# deeplearning-js
[![npm version](https://badge.fury.io/js/deeplearning-js.svg)](https://badge.fury.io/js/deeplearning-js)
[![CircleCI](https://circleci.com/gh/AlanWei/deeplearning-js.svg?style=shield)](https://circleci.com/gh/AlanWei/deeplearning-js)
<a id="intention"></a>
## Intention
**deeplearning-js** is an open source JavaScript library for deep learning. **deeplearning-js** provides all JavaScript developers a new way to play around with deep learning models without learning unfamiliar Python, statistics or calculus knowledge.

<a id="getstarted"></a>
## Getting started
~~~~
npm install deeplearning-js
~~~~

~~~~
yarn add deeplearning-js
~~~~

<a id="api"></a>
## API
<a id="array2d"></a>
### Array2D
Array2D is **deeplearning-js** base data model to represent a 2 dimensions matrix.

#### Initialize
~~~~
// new Array2D(shape: [row: number, col: number] = [0, 0], values: Array<number> = [])
const example = new Array2D([3, 3], [1, 2, 3, 1, 2, 3, 1, 2, 3]);
example.shape === [3, 3]
example.value === [1, 2, 3, 1, 2, 3, 1, 2, 3]
example.matrix === [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
]
~~~~

#### Element-wise operations (All element-wise operations support auto-broadcasting)
~~~~
const left = new Array2D([3, 3], [1, 2, 3, 1, 2, 3, 1, 2, 3]);
const right = new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1])
expect(left.add(right)).toEqual(new Array2D([3, 3], [2, 3, 4, 2, 3, 4, 2, 3, 4]))
expect(left.subtract(right)).toEqual(new Array2D([3, 3], [2, 3, 4, 2, 3, 4, 2, 3, 4]))
expect(left.multiply(right)).toEqual(new Array2D([3, 3], [1, 2, 3, 1, 2, 3, 1, 2, 3]))
expect(left.divide(right)).toEqual(new Array2D([3, 3], [1, 2, 3, 1, 2, 3, 1, 2, 3]))
~~~~

#### Dot
~~~~
const left = new Array2D([1, 3], [1, 2, 3]);
const right = new Array2D([3, 1], [1, 1, 1]);
expect(left.dot(right)).toEqual(new Array2D([1, 1], [6]));
~~~~

#### Transpose
~~~~
const example = new Array2D([1, 3], [1, 2, 3]);
example.transpose() === new Array2D([3, 1], [1, 2, 3]);
~~~~

#### as1D
~~~~
const example = new Array2D([1, 3], [1, 2, 3]);
example.as1D() === [1, 2, 3];
~~~~

#### Squeeze
~~~~
const example = new Array2D([1, 1], [6]);
example.squeeze() = 6;
~~~~

<a id="scalar"></a>
### Scalar
Scalar is **deeplearning-js** base data model to initialize a number.

#### Initialize
~~~~
const scalar = new Scalar([3, 3], 1);
scalar.shape === [3, 3]
scalar.value === 3
scalar.array2D === new Array2D([3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1])
~~~~

<a id="normalization"></a>
### Normalization
Normalize 1D Array data set.

Support normalization method:

* rescaling (num - min) / (max - min)
* meanNormalization (num - mean) / (max - min)

#### Usage
~~~~
expect(Normalization.rescaling([1, 2, 3])).toEqual([0, 0.5, 1]);
expect(Normalization.meanNormalization([1, 2, 3])).toEqual([-0.5, 0, 0.5]);
~~~~

<a id="initializeparameters"></a>
### initializeParameters
Return initial parameters according to model structure.

Support activation functions:

* linear
* relu
* sigmoid
* softmax

#### Return
~~~~
{
  W1: Array2D,
  b1: Array2D,
  ...
  Wl: Array2D,
  bl: Array2D,
}
~~~~

#### Usage
~~~~
const initialParameters = initializeParameters(
  [{
    size: trainingSet.input.shape[0],  // input layer nerouns
  }, {
    size: 56,                          // hidden layer nerouns
    activationFunc: 'relu',            // hidden layer activation function
  }, {
    ...                                // more hidden layers
  }, {
    size: trainingSet.output.shape[0], // output layer nerouns
    activationFunc: 'softmax',         // output layer activation function
  }],
  0,                                   // mean (default: 0)
  1,                                   // variance (default: 1)
  0.01,                                // scale (default: 0.01)
);
~~~~

<a id="train"></a>
### train
Return parameters after training.

Support cost functions:

* quadratic
* cross-entropy

#### Return
~~~~
{
  parameters: {
    W1: Array2D,
    b1: Array2D,
    ...
    Wl: Array2D,
    bl: Array2D,
  },
  costs: Array<{
    epoch: number,
    cost: number,
  }>,
}
~~~~

#### Usage
~~~~
train(
  input: Array2D,
  output: Array2D,
  initialParameters: any,
  costFunc: 'quadratic' | 'cross-entropy',
  learningRate: number,
  numOfIterations: number,
  baseIterationToComputeCost: number,
  learningRateDecayRate?: number,
  showLog?: boolean,
);
~~~~

<a id="forwardpropagation"></a>
### forwardPropagation
Return predict values based on input data and model parameters.

#### Return
~~~~
{
  yHat: Array2D,                       // predict values
  caches: Array<Cache>,                // for backPropagation
  activationFuncs: Array<string>,      // for backPropagation
}
~~~~

#### Usage
~~~~
const forward = forwardPropagation(input, parameters);
const predict = forward.yHat;
~~~~