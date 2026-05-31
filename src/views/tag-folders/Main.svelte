<script lang="ts">
  import NavFilesContainer from '$lib/obsidian/file-tree-list/NavFilesContainer.svelte'
  import { db } from '$lib/db'
  import Toolbar from './Toolbar.svelte'
  import TagTree from './TagTree.svelte'
  import { set } from 'lodash-es'

  const tags = $derived(
    // prettier-ignore
    db
      .exec(`
        select tag, count(tag)
        from tags
        group by tag
      `,)
      .at(0)
      ?.values.reduce((acc, cur) => {
        const objectPath = (cur.at(0)! as string).replaceAll('/', '.')
        return set(acc, objectPath, true)
      }, {}),
  )
</script>

<Toolbar />

<NavFilesContainer>
  {#if tags}
    <TagTree subTags={tags} count={20} />
  {/if}
</NavFilesContainer>
