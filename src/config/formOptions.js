const dayOptions = [
    { key: 'none', text: 'None', value: '' },
    { key: 'Monday', text: 'Monday', value: 'Monday' },
    { key: 'Tuesday', text: 'Tuesday', value: 'Tuesday' },
    { key: 'Wednesday', text: 'Wednesday', value: 'Wednesday' },
    { key: 'Thursday', text: 'Thursday', value: 'Thursday' },
    { key: 'Friday', text: 'Friday', value: 'Friday' },
    { key: 'Saturday', text: 'Saturday', value: 'Saturday' },
    { key: 'Sunday', text: 'Sunday', value: 'Sunday' },
];

const colorOptions = [
    {
        key: 'none',
        text: 'Default',
        value: '',
    },
    {
        key: 'red',
        text: 'Red',
        value: 'red',
    },
    {
        key: 'green',
        text: 'Green',
        value: 'green',
    },
    {
        key: 'blue',
        text: 'Blue',
        value: 'blue',
    },
    {
        key: 'violet',
        text: 'Violet',
        value: 'violet',
    },
    {
        key: 'brown',
        text: 'Brown',
        value: 'brown',
    },
    {
        key: 'grey',
        text: 'Grey',
        value: 'grey',
    },
    {
        key: 'purple',
        text: 'Purple',
        value: 'purple',
    },
    {
        key: 'pink',
        text: 'Pink',
        value: 'pink',
    },
];

const sortOptions = [
    { key: 'day', text: 'Day', value: 'day', icon: 'calendar' },
    { key: 'color', text: 'Color', value: 'color', icon: 'tint' },
    { key: 'none', text: 'All', value: 'none', icon: 'th' },
];

export { dayOptions, colorOptions, sortOptions };
