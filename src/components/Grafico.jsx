import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const COLOR_PALETTE = [
  ['#005fbf', '#0088FE', '#4da6ff'], // Azul con gradiente
  ['#008768', '#00C49F', '#4dd9b8'], // Verde con gradiente
  ['#cc961a', '#FFBB28', '#ffd15c'], // Amarillo con gradiente
  ['#cc4a22', '#FF8042', '#ff9d6b'], // Naranja con gradiente
  ['#5a5aa5', '#8884D8', '#a8a6e8'], // Púrpura con gradiente
  ['#4d8a6d', '#82CA9D', '#a3d9b9'], // Verde claro
  ['#cc8a99', '#FFC0CB', '#ffd6dd'], // Rosa
  ['#3dccb2', '#7FFFD4', '#a3ffe2'], // Aqua
  ['#cc5a5a', '#F08080', '#f5a3a3'], // Rojo claro
  ['#6a5a8a', '#9370DB', '#b098e5'], // Lila
  ['#2a8a4d', '#3CB371', '#6ccd91'], // Verde oscuro
  ['#8a6a0b', '#B8860B', '#d0a53d'], // Oro oscuro
  ['#0a8a8a', '#20B2AA', '#56c9c2'], // Verde azulado
  ['#a04d6a', '#DB7093', '#e59db4'], // Rosa oscuro
  ['#cc3a1a', '#FF6347', '#ff8a75']  // Rojo anaranjado
];

const colorMap = {};

const getColorForLabel = (label) => {
  if (!colorMap[label]) {
    const labels = Object.keys(colorMap);
    const colorIndex = labels.length % COLOR_PALETTE.length;
    colorMap[label] = COLOR_PALETTE[colorIndex];
  }
  return colorMap[label];
};

// Componente de Barra personalizada con efecto 3D
const CustomBar = (props) => {
  const { fill, x, y, width, height, name } = props;
  const [baseColor, mainColor, highlightColor] = fill;
  
  return (
    <g>
      {/* Sombra para efecto 3D */}
      <rect
        x={x}
        y={y + 5}
        width={width}
        height={height}
        fill="rgba(0,0,0,0.2)"
        rx={4}
      />
      {/* Parte trasera de la barra */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={baseColor}
        rx={4}
      />
      {/* Parte principal de la barra con gradiente */}
      <defs>
        <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={highlightColor} />
          <stop offset="100%" stopColor={mainColor} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient-${name})`}
        rx={4}
        style={{ transition: 'all 0.3s ease' }}
        className="hover:opacity-90"
      />
      {/* Borde superior para efecto 3D */}
      <rect
        x={x}
        y={y}
        width={width}
        height={2}
        fill={highlightColor}
        rx={4}
      />
    </g>
  );
};

// Componente de Sector personalizado para gráfico de pie 3D
const CustomPieCell = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, percent }) => {
  const [baseColor, mainColor, highlightColor] = fill;
  const radius = outerRadius;
  const thickness = outerRadius - innerRadius;
  
  // Coordenadas para el efecto 3D
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);
  
  const innerX1 = cx + (radius - thickness) * Math.cos(startRad);
  const innerY1 = cy + (radius - thickness) * Math.sin(startRad);
  const innerX2 = cx + (radius - thickness) * Math.cos(endRad);
  const innerY2 = cy + (radius - thickness) * Math.sin(endRad);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  const path = [
    `M ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${innerX2} ${innerY2}`,
    `A ${radius - thickness} ${radius - thickness} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
    'Z'
  ].join(' ');
  
  const shadowPath = [
    `M ${x1} ${y1 + 5}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2 + 5}`,
    `L ${x2} ${y2}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
    'Z'
  ].join(' ');
  
  return (
    <g>
      {/* Sombra */}
      <path d={shadowPath} fill="rgba(0,0,0,0.15)" />
      {/* Parte lateral */}
      <path 
        d={`M ${x1} ${y1} L ${innerX1} ${innerY1} L ${innerX1} ${innerY1 + 5} L ${x1} ${y1 + 5} Z`} 
        fill={baseColor} 
      />
      {/* Parte principal con gradiente */}
      <defs>
        <linearGradient id={`pie-gradient-${cx}-${cy}-${startAngle}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={highlightColor} />
          <stop offset="100%" stopColor={mainColor} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill={`url(#pie-gradient-${cx}-${cy}-${startAngle})`}
        stroke="none"
        style={{ transition: 'all 0.3s ease' }}
        className="hover:opacity-90"
      />
      {/* Borde superior */}
      <path
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
        fill="none"
        stroke={highlightColor}
        strokeWidth={2}
      />
    </g>
  );
};

const renderChart = (graphType, data) => {
  switch (graphType) {
    case 'complaints_by_type':
    case 'complaints_by_status':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="label" 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }} 
            />
            <YAxis 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }} 
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-gray-700">{value}</span>}
            />
            {data.map((entry, index) => (
              <Bar 
                key={`bar-${index}`}
                dataKey="value"
                name={entry.label}
                shape={<CustomBar />}
                fill={getColorForLabel(entry.label)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    default:
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="label"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColorForLabel(entry.label)}
                  shape={<CustomPieCell />}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [value, name]}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
  }
};

export const GraphCard = ({ graph }) => {
  // Reset color map para cada gráfico nuevo
  Object.keys(colorMap).forEach(key => delete colorMap[key]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-all hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-4 capitalize text-gray-800">
        {graph.graphType.replace(/_/g, ' ')}
      </h3>
      <div className="h-64 relative">
        {renderChart(graph.graphType, graph.data)}
        {/* Efecto de reflejo */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent opacity-50"></div>
      </div>
      <div className='mt-20'>
      <p className="text-sm text-gray-500 mt-3 italic">
        Última actualización: {new Date(graph.lastUpdated).toLocaleString()}
      </p>
      </div>
    </div>
  );
};