import {
    FrameType,
    Base64PNG,
} from './types';

export const FrameType1 = 1 as FrameType;
export const FrameType2 = 2 as FrameType;
export const FrameType3 = 3 as FrameType;
export const FrameType4 = 4 as FrameType;
export const FrameType5 = 5 as FrameType;
export const DefaultFrameType = FrameType1;

interface CornerPNGSet {
    TopRight: Base64PNG,
    BottomRight: Base64PNG,
}

export const FrameData = new Map<FrameType, CornerPNGSet>([
    [
        FrameType1,
        {
            TopRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAqklEQVQImU3LPQ4BQQBA4Tdr/cR/hEJ0EkKyxVKLRqMShXO4lAPoNI4ggm4riUZsFGKRMHZmJFN59ffEbL4y5+DL8+qA0By2E8FfrucLCsUEj0jxCGOG45W5h5LDbmqhY1UecmWXRjtDowX5qsDvL40Fm7VEyJS1BkW2Iqh3HIvsfAk0r5vEG6WJAa01tUISh5hub2HctzxiwianfYLBuMxHRfZUKkWpKvgBDdA5hID5ML8AAAAASUVORK5CYII=',
            BottomRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAtElEQVQImSWMvWrCYBhGz/slMbSDg5ixoEiHCo4uLl5BLsfVK3D2Xipeg6DBQqt0En/iEDWGmJjkE+MZH85zpN0e6YrVpNWz6XQNlFIgwjGA7/EM0640eHM0TtNi6xcgWSmd9zkahVn/zPn4eicJM56IGKQXwZvc+PsdiOq7NeyqhYgQBQVxACc/IU4X5cHcHDLSUHO95ITHjOis2f3PWa+GUgrL6Ssd+QXxXfPjuQJuuQE8AESWQ/0OwYyFAAAAAElFTkSuQmCC',
        },
    ] as [FrameType, CornerPNGSet],
    [
        FrameType2,
        {
            TopRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAqklEQVQImU3LPQ4BQQBA4Tdr/cR/hEJ0EkKyxVKLRqMShXO4lAPoNI4ggm4riUZsFGKRMHZmJFN59ffEbL4y5+DL8+qA0By2E8FfrucLCsUEj0jxCGOG45W5h5LDbmqhY1UecmWXRjtDowX5qsDvL40Fm7VEyJS1BkW2Iqh3HIvsfAk0r5vEG6WJAa01tUISh5hub2HctzxiwianfYLBuMxHRfZUKkWpKvgBDdA5hID5ML8AAAAASUVORK5CYII=',
            BottomRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAtElEQVQImSWMvWrCYBhGz/slMbSDg5ixoEiHCo4uLl5BLsfVK3D2Xipeg6DBQqt0En/iEDWGmJjkE+MZH85zpN0e6YrVpNWz6XQNlFIgwjGA7/EM0640eHM0TtNi6xcgWSmd9zkahVn/zPn4eicJM56IGKQXwZvc+PsdiOq7NeyqhYgQBQVxACc/IU4X5cHcHDLSUHO95ITHjOis2f3PWa+GUgrL6Ssd+QXxXfPjuQJuuQE8AESWQ/0OwYyFAAAAAElFTkSuQmCC',
        },
    ] as [FrameType, CornerPNGSet],
    [
        FrameType3,
        {
            TopRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAqklEQVQImU3LPQ4BQQBA4Tdr/cR/hEJ0EkKyxVKLRqMShXO4lAPoNI4ggm4riUZsFGKRMHZmJFN59ffEbL4y5+DL8+qA0By2E8FfrucLCsUEj0jxCGOG45W5h5LDbmqhY1UecmWXRjtDowX5qsDvL40Fm7VEyJS1BkW2Iqh3HIvsfAk0r5vEG6WJAa01tUISh5hub2HctzxiwianfYLBuMxHRfZUKkWpKvgBDdA5hID5ML8AAAAASUVORK5CYII=',
            BottomRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAtElEQVQImSWMvWrCYBhGz/slMbSDg5ixoEiHCo4uLl5BLsfVK3D2Xipeg6DBQqt0En/iEDWGmJjkE+MZH85zpN0e6YrVpNWz6XQNlFIgwjGA7/EM0640eHM0TtNi6xcgWSmd9zkahVn/zPn4eicJM56IGKQXwZvc+PsdiOq7NeyqhYgQBQVxACc/IU4X5cHcHDLSUHO95ITHjOis2f3PWa+GUgrL6Ssd+QXxXfPjuQJuuQE8AESWQ/0OwYyFAAAAAElFTkSuQmCC',
        },
    ] as [FrameType, CornerPNGSet],
    [
        FrameType4,
        {
            TopRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAqklEQVQImU3LPQ4BQQBA4Tdr/cR/hEJ0EkKyxVKLRqMShXO4lAPoNI4ggm4riUZsFGKRMHZmJFN59ffEbL4y5+DL8+qA0By2E8FfrucLCsUEj0jxCGOG45W5h5LDbmqhY1UecmWXRjtDowX5qsDvL40Fm7VEyJS1BkW2Iqh3HIvsfAk0r5vEG6WJAa01tUISh5hub2HctzxiwianfYLBuMxHRfZUKkWpKvgBDdA5hID5ML8AAAAASUVORK5CYII=',
            BottomRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAtElEQVQImSWMvWrCYBhGz/slMbSDg5ixoEiHCo4uLl5BLsfVK3D2Xipeg6DBQqt0En/iEDWGmJjkE+MZH85zpN0e6YrVpNWz6XQNlFIgwjGA7/EM0640eHM0TtNi6xcgWSmd9zkahVn/zPn4eicJM56IGKQXwZvc+PsdiOq7NeyqhYgQBQVxACc/IU4X5cHcHDLSUHO95ITHjOis2f3PWa+GUgrL6Ssd+QXxXfPjuQJuuQE8AESWQ/0OwYyFAAAAAElFTkSuQmCC',
        },
    ] as [FrameType, CornerPNGSet],
    [
        FrameType5,
        {
            TopRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAqklEQVQImU3LPQ4BQQBA4Tdr/cR/hEJ0EkKyxVKLRqMShXO4lAPoNI4ggm4riUZsFGKRMHZmJFN59ffEbL4y5+DL8+qA0By2E8FfrucLCsUEj0jxCGOG45W5h5LDbmqhY1UecmWXRjtDowX5qsDvL40Fm7VEyJS1BkW2Iqh3HIvsfAk0r5vEG6WJAa01tUISh5hub2HctzxiwianfYLBuMxHRfZUKkWpKvgBDdA5hID5ML8AAAAASUVORK5CYII=',
            BottomRight: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAtElEQVQImSWMvWrCYBhGz/slMbSDg5ixoEiHCo4uLl5BLsfVK3D2Xipeg6DBQqt0En/iEDWGmJjkE+MZH85zpN0e6YrVpNWz6XQNlFIgwjGA7/EM0640eHM0TtNi6xcgWSmd9zkahVn/zPn4eicJM56IGKQXwZvc+PsdiOq7NeyqhYgQBQVxACc/IU4X5cHcHDLSUHO95ITHjOis2f3PWa+GUgrL6Ssd+QXxXfPjuQJuuQE8AESWQ/0OwYyFAAAAAElFTkSuQmCC',
        },
    ] as [FrameType, CornerPNGSet],
]);

export const textColors = [
    'rgb(210,210,210)',
    'rgb(36,184,184)',
    'rgb(197,196,52)',
    'rgb(36,184,36)',
    'rgb(36,128,184)',
    'rgb(172,21,20)',
];

export const DisplayWidth = 256;
export const DisplayHeight = 192;
export const DefaultColumnCount = 21.5;
export const DefaultRowCount = 3;
export const DefaultX = 8;
export const DefaultY = 130;
export const DefaultMessageSpeed = 2;
export const DefaultFeed: [number, number] = [10, 13];
export const DBName = 'Pokedan';
