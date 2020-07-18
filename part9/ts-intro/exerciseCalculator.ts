// interface FitnessRecord {
//     dailyTarget: number;
//     exerciseRecord: Array<number>;
// }

// const parseFitnessRecord = (args: Array<string>): FitnessRecord => {
//     if (args.length <= 3) throw new Error('Not enough arguments');

//     const dailyTarget = Number(args[2]);

//     const exerciseRecord = args.slice(3).map((arg) => {
//         if (isNaN(Number(arg))) {
//             throw new Error('Provided values were not numbers');
//         }

//         return Number(arg);
//     });

//     return {
//         dailyTarget,
//         exerciseRecord,
//     };
// };

interface FitnessEvaluation {
    // the number of days
    totalDays: number;

    // the number of training days
    trainingDays: number;

    // the original target value of daily exercise
    dailyTarget: number;

    // daily average
    dailyAverage: number;

    // boolean value describing if the target was reached
    success: boolean;

    // a rating between 1 to 3 that tells how well the hours are met
    rating: number;

    // a text value explaining the rating
    ratingDescription: string;
}

export const evaluateFitnessRecord = (
    dailyTarget: number,
    exerciseRecord: Array<number>,
): FitnessEvaluation => {
    const totalDays: number = exerciseRecord.length;

    const trainingDays: number = exerciseRecord.filter((day) => day !== 0)
        .length;

    const totalHours: number = exerciseRecord.reduce(
        (prev, curr) => prev + curr,
    );

    const dailyAverage: number = totalHours / exerciseRecord.length;

    const rating: number = ((): number => {
        const excellent = dailyTarget;
        const good = excellent / 2;

        if (dailyAverage >= excellent) {
            return 3;
        } else if (dailyAverage >= good) {
            return 2;
        } else {
            return 1;
        }
    })();

    interface RatingDescriptionInterface {
        [key: number]: string;
    }

    const ratingDescription: RatingDescriptionInterface = {
        1: 'I want to see you try harder next time. You can do better than this.',
        2: "Good work!! Let's try to do even better next time.",
        3: 'Excellent work!! Keep it up.',
    };

    const success: boolean = dailyAverage >= dailyTarget;

    return {
        totalDays,
        trainingDays,
        dailyTarget,
        dailyAverage,
        success,
        rating,
        ratingDescription: ratingDescription[rating],
    };
};

// try {
//     const { dailyTarget, exerciseRecord } = parseFitnessRecord(process.argv);

//     console.log(evaluateFitnessRecord(dailyTarget, exerciseRecord));
// } catch (e) {
//     console.log('Oops, something bad happened...', e.message);
// }
