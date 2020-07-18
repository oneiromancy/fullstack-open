// interface BodyMeasurements {
//     height: number;
//     weight: number;
// }

// const parseBodyMeasurements = (args: Array<string>): BodyMeasurements => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3]),
//         };
//     } else {
//         throw new Error('Provided values were not numbers');
//     }
// };

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height / 100, 2);
    let healthMessage: string;

    if (bmi >= 25) {
        healthMessage = 'Overweight';
    } else if (bmi < 18.5) {
        healthMessage = 'Underweight';
    } else {
        healthMessage = 'Normal (healthy weight)';
    }

    return healthMessage;
};

// try {
//     const { height, weight } = parseBodyMeasurements(process.argv);

//     console.log(calculateBmi(height, weight));
// } catch (e) {
//     console.log('Oops, something bad happened...', e.message);
// }
