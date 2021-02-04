if (window.matchMedia('(max-width: 1199px)').matches) {
  document.getElementById('image-click-desktop').style.display = 'none';
} else {
  var treeData = [
    {
      name: 'Compétences',
      parent: 'null',
      children: [
        {
          name: 'CSS',
          parent: 'Compétences',
          children: [
            {
              name: 'Basic',
              parent: 'CSS',
              children: [
                {
                  name: 'grids, flexbox, float, position...',
                  parent: 'Basic',
                },
                {
                  name: 'Media Queries',
                  parent: 'Basic',
                },
              ],
            },
            {
              name: 'Avancé',
              parent: 'CSS',
              children: [
                {
                  name: 'Méthodologie BEM',
                  parent: 'Avancé',
                },
                {
                  name: 'Pré-processeur : Sass',
                  parent: 'Avancé',
                },
              ],
            },
          ],
        },
        {
          name: 'Javascript',
          parent: 'Compétences',
          children: [
            {
              name: 'Dom Manipulation',
              parent: 'Javscript',
            },
            {
              name: 'Fetchig API',
              parent: 'Javscript',
            },
            {
              name: 'Librairies',
              parent: 'Javascript',
              children: [
                {
                  name: 'Leaflet & cartographies',
                  parent: 'Librairies',
                },
                {
                  name: 'D3js & data visualization',
                  parent: 'Librairies',
                },
              ],
            },
          ],
        },
        {
          name: 'React',
          parent: 'Compétences',
        },
        {
          name: 'PHP',
          parent: 'Compétences',
          children: [
            {
              name: 'Symfony',
              parent: 'PHP',
              children: [
                {
                  name: 'Twig',
                  parent: 'Symfony',
                },
                {
                  name: 'Doctrine ORM',
                  parent: 'Symfony',
                },
                {
                  name: 'Webpack Encore',
                  parent: 'Symfony',
                },
              ],
            },
            {
              name: 'Wordpress',
              parent: 'PHP',
            },
          ],
        },
        {
          name: 'Bonnes pratiques',
          parent: 'Compétences',
          children: [
            {
              name: 'Git : Gitlab & Github',
              parent: 'Bonnes pratiques',
            },
            {
              name: 'Linter : EsLint',
              parent: 'Bonnes pratiques',
            },
          ],
        },
        {
          name: 'Graphisme',
          parent: 'Compétences',
          children: [
            {
              name: 'Photoshop & Illustrator',
              parent: 'Graphisme',
            },
            {
              name: 'Figma & Adobe XD',
              parent: 'Graphisme',
            },
          ],
        },
      ],
    },
  ];

  // ************** Generate the tree diagram	 *****************
  var margin = { top: 60, right: 120, bottom: 40, left: 250 },
    width = 965 - margin.right - margin.left,
    height = 750 - margin.top - margin.bottom;

  var i = 0,
    duration = 750,
    root;

  var tree = d3.layout.tree().size([height, width]);

  var diagonal = d3.svg.diagonal().projection(function (d) {
    return [d.y, d.x];
  });

  var svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;

  update(root);

  d3.select(self.frameElement).style('height', '500px');

  function update(source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
      d.y = d.depth * 180;
    });

    // Update the nodes…
    var node = svg.selectAll('g.node').data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', click);

    nodeEnter
      .append('circle')
      .attr('r', 1e-6)
      .style('fill', function (d) {
        return d._children ? 'orange' : '#fff';
      });

    nodeEnter
      .append('text')
      .attr('x', function (d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function (d) {
        return d.name;
      })
      .style('fill-opacity', 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate
      .select('circle')
      .attr('r', 10)
      .style('fill', function (d) {
        return d._children ? 'orange' : '#fff';
      });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    // Update the links…
    var link = svg.selectAll('path.link').data(links, function (d) {
      return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    // Transition links to their new position.
    link.transition().duration(duration).attr('d', diagonal);

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
}
