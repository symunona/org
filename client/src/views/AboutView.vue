<template>
  <div class="about">
    <h1>About ORG</h1>
    <p>
      Trying to figure out how our mind works is a great challenge. Not only it
      changes over time, but it has it's evolutionary biases that make it harder
      to map our reality around us, especially how we perceive ourselves..
    </p>
    <p>
      Writing is a way to cope with this. However as the mind has it's limits
      after a limit it's easy to end up in chaos.
    </p>
    <p>
      Regular reflection on self and the world around us help in living a more
      conscious life and preserve our sanity on the long run.
    </p>
    <p>
      This is a futile try at organizing my writings into a useful, searchable,
      inspiring format, digital Mari Kondoing my life, keeping organized
      snapshots of how I percieve reality. A place to reflect, a place to
      collect thoughts.
    </p>
    <h2>How it works</h2>
    <p>
      I keep my written files in utf8 plain text format, so it's accessible from
      a wide range of devices with limited resources. Org builds on that and
      adds an interface over these files that makes it easy to search and
      categorize.
    </p>
    <p>
      Each directory (unless otherwise specified in settings (TBD)) is mapped as
      a tag. Each <code>.md</code> files are also parsed for front matter
      metadata which can contain a <code>tags</code> attribute with a list of
      tags that will be appended to the tag db.
    </p>
    <p>
      Then all that data is taken and built into an index file, which is
      accessible through the API. The frontend uses that to make certain
      repetitive patterns easier, like filtering for tags, creating new elements
      with the same metadata as the ones with similar tags.
    </p>
  </div>
</template>
