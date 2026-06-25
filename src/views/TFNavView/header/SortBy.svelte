<script lang="ts">
  import NavActionButton from '$lib/obsidian/file-tree-header/NavActionButton.svelte'
  import { Menu, Platform } from 'obsidian'
  import { ArrowUpNarrowWide } from '@lucide/svelte'
  import { settings } from '$state/settings.svelte'
  import { SortOrder } from '$lib/enums/SortOrder'

  let isOpen = $state(false)

  function open(e: MouseEvent) {
    const menu = new Menu()

    menu.addItem(item =>
      item
        .setTitle('File name (A to Z)')
        .setChecked(settings.current.sortOrder === SortOrder.filename_desc)
        .onClick(() => (settings.current.sortOrder = SortOrder.filename_desc)),
    )
    menu.addItem(item =>
      item
        .setTitle('File name (Z to A)')
        .setChecked(settings.current.sortOrder === SortOrder.filename_asc)
        .onClick(() => (settings.current.sortOrder = SortOrder.filename_asc)),
    )
    menu.addSeparator()
    menu.addItem(item =>
      item
        .setTitle('Modified time (new to old)')
        .setChecked(settings.current.sortOrder === SortOrder.mtime_desc)
        .onClick(() => (settings.current.sortOrder = SortOrder.mtime_desc)),
    )
    menu.addItem(item =>
      item
        .setTitle('Modified time (old to new)')
        .setChecked(settings.current.sortOrder === SortOrder.mtime_asc)
        .onClick(() => (settings.current.sortOrder = SortOrder.mtime_asc)),
    )
    menu.addSeparator()
    menu.addItem(item =>
      item
        .setTitle('Created time (new to old)')
        .setChecked(settings.current.sortOrder === SortOrder.ctime_desc)
        .onClick(() => (settings.current.sortOrder = SortOrder.ctime_desc)),
    )
    menu.addItem(item =>
      item
        .setTitle('Created time (old to new)')
        .setChecked(settings.current.sortOrder === SortOrder.ctime_asc)
        .onClick(() => (settings.current.sortOrder = SortOrder.ctime_asc)),
    )

    menu.showAtMouseEvent(e)
    isOpen = true
    menu.onHide(() => (isOpen = false))
  }
</script>

<NavActionButton hasActiveMenu={isOpen} onclick={open}>
  <ArrowUpNarrowWide size={Platform.isMobile ? 24 : 18} />
</NavActionButton>
