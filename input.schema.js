// type: The type of variable represented
// default: A default value if none has been provided
// desc: A human-readible description of what the variable represents
// value: The supplied value for the variable
// enum: A limited selection of values the variable can take on

export default {
  floors: {
    type: Number,
    default: 1,
    desc: 'The total number of floors in the building',
    test: () => 'Test',
    // value: 5,
  },
  elevator: {
    type: Boolean,
    default: false,
    desc: 'Whether or not the building has an elevator',
    // value: false,
  },
  type: {
    type: String,
    default: 'multi-family',
    desc: 'The property type, e.g. multi-family, mixed-use, etc.',
    enum: ['multi-family', 'mixed-use'],
    // value: 'multi-family',
  },
  resUnits: {
    type: Number,
    default: 1,
    desc: 'The number of residential units the property has',
    // value: 18,
  },
};

// const requiredInputs = ['floors', 'elevator', 'type', 'resUnits'];
