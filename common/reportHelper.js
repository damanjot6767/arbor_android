import { steps } from "../constants/reportConstant";
export const renderOptions = (item) => {
    if (step === 9) {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item.rating}
                    value={item._id}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 10) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 11) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 12) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 13) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 14) {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item?.jurisdiction}
                    value={item?._id}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 15) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 17) {
        return (
            <View key={item}>
                <RadioButton.Item
                    label={item}
                    value={item}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }
    else if (step === 18) {
        return (
            <View key={item?._id}>
                <RadioButton.Item
                    label={item?.recomendation}
                    value={item?._id}
                    color="black"
                    labelStyle={{
                        color: 'black'
                    }}
                />
            </View>
        );
    }


};
