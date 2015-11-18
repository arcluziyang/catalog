import React, { PropTypes } from 'react';
import Radium from 'radium';
import { heading, text, link } from '../../../scaffold/typography';

function generateAttributeElement(attributes) {
  return attributes.map((attribute, i) => {
    return (
      <li key={`${attribute}-${i}`}>
        {attribute}
      </li>);
  });
}

function generateLinkElement(links, styles) {
  return links.map((linkElement, i) => {
    return (
      <li key={`${linkElement}-${i}`} style={styles.truncate}>
        <a key={i} href={linkElement} style={styles.link}>
          {linkElement}
        </a>
      </li>);
  });
}

class MetadataBlock extends React.Component {
  render() {
    const {theme, attributes, title, links, inverted} = this.props;
    let styles = {
      title: {
        ...heading(theme, {level: 6}),
        margin: 0
      },
      list: {
        ...text(theme, {level: 3}),
        listStyle: 'none',
        padding: 0
      },
      truncate: {
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      link: {
        ...link(theme)
      },
      dark: {
        color: theme.lightColor
      }
    };

    let dark = inverted ? styles.dark : null;

    let titleElement = title ? <h2 style={[styles.title, dark]}>{title}</h2> : null;
    let attributeElement = attributes && attributes.length > 0
      ? <ul style={[styles.list, dark]}>{generateAttributeElement(attributes)}</ul>
      : null;
    let linkElement = links && links.length > 0
      ? <ul style={styles.list}>{generateLinkElement(links, styles)}</ul>
      : null;

    return (
      <div>
        {titleElement}
        {attributeElement}
        {linkElement}
      </div>
    );
  }
}

MetadataBlock.defaultProps = {
  theme: {}
};

MetadataBlock.propTypes = {
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  attributes: PropTypes.array,
  links: PropTypes.array,
  inverted: PropTypes.bool
};

export default Radium(MetadataBlock);