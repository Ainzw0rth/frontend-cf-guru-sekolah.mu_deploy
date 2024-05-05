import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StudentPresenceSummary } from "../types/Evaluation";

interface PresenceChartProps {
    presence: StudentPresenceSummary[];
}

const StudentPresenceChart = (props: PresenceChartProps) => {
    const presenceSummary = props.presence;
    const chartContainer = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (presenceSummary && presenceSummary.length) {
            const labels = presenceSummary.map(item => item.status);
            const data = presenceSummary.map(item => item.total);
            const totalPresence = data.reduce((acc, curr) => acc + curr, 0);
            const backgroundColors = ['#4CAF50', '#FFC107', '#2196F3', '#F44336'];
    
            const ctx = chartContainer.current!.getContext('2d')!;
            let chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        datalabels: {
                            formatter: (value) => {
                                let percentage = ((value / totalPresence) * 100).toFixed(2);
                                return `${percentage}%`;
                            },
                            font: {
                                weight: 'bold',
                                size: 12,
                                family: 'Arial'
                            },
                            color: '#fff',
                            anchor: 'end',
                            align: 'start',
                            offset: 10
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
    
            return () => {
                chartInstance.destroy();
            };
        }
    }, [presenceSummary]);
    
    console.log('presenceSummary:', presenceSummary);
    return (
        <div className="shadow-md rounded-md overflow-hidden border border-neutral4">
            <div className="bg-persian-blue5 text-neutral6 py-3 px-5 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Statistik Presensi</h3>
            </div>
            { presenceSummary.length == 0 ? (
                    <div className="flex items-center justify-center w-full h-40">
                        <p className="text-lg text-center text-neutral9 italic">Belum ada presensi </p>
                    </div>
                ) : (
                    <div className="p-5" style={{ width: '100%', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <canvas ref={chartContainer} style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
                    </div>
                )
            }
        </div>
    );    
}

export default StudentPresenceChart;
