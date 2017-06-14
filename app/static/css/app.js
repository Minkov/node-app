import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'list': {
    'listStyleType': 'none',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'list>li': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'nav': {
    'backgroundColor': 'red'
  },
  'nav': {
    'listStyleType': 'none',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'textAlign': 'center',
    'fontSize': [{ 'unit': 'px', 'value': 0 }]
  },
  'nav>li': {
    'display': 'inline-block',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'px', 'value': 14 }],
    'borderLeft': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'white' }]
  },
  'nav li:last-of-type': {
    'borderRight': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'white' }]
  },
  'nav li:hover': {
    'backgroundColor': 'rgba(255, 255, 255, .3)'
  },
  'nav li a': {
    'color': 'white',
    'textDecoration': 'none',
    'display': 'inline-block',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'nav>li>a': {
    'color': 'white',
    'textDecoration': 'none',
    'display': 'inline-block',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'nav>li>a': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 30 }],
    'fontSize': [{ 'unit': 'em', 'value': 1.1 }]
  },
  'nav>li li a': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }]
  },
  'has-dropdown': {
    'position': 'relative'
  },
  'has-dropdown dropdown': {
    'zIndex': '9999',
    'position': 'absolute',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'backgroundColor': 'red'
  },
  'has-dropdown dropdown li': {
    'fontSize': [{ 'unit': 'px', 'value': 12 }]
  }
});
