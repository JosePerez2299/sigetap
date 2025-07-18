const calculateProgress = (success: number, total: number): number => {
    return total > 0 ? (success / total) * 100 : 0;
};

export default calculateProgress;