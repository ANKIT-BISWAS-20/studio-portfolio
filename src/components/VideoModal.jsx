import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

/** Builds the privacy-friendly embed address for a video config from content.js. */
function embedUrl(v) {
  if (v.type === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  }
  if (v.type === 'loom') {
    const t = v.start ? `&t=${v.start}` : ''
    return `https://www.loom.com/embed/${v.id}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true${t}`
  }
  return v.url
}

const host = { youtube: 'YouTube', loom: 'Loom' }

/**
 * Video pop-up. The player is only created while the dialog is open, so nothing is
 * downloaded until someone presses play, and closing the dialog stops the video.
 */
export default function VideoModal({ video, title, open, onClose }) {
  if (!video) return null
  return (
    <Dialog open={open} onClose={onClose} className="native-cursor relative z-[1100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/75 transition duration-200 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 grid place-items-center overflow-y-auto p-3 sm:p-6">
        <DialogPanel
          transition
          className="w-full max-w-4xl rounded-2xl border border-line bg-card p-3 shadow-2xl transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 sm:p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <DialogTitle className="display truncate text-lg sm:text-xl">{title}</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="icon-btn shrink-0"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl(video)}
              title={`${title} demo video`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="mono mt-3 px-1 text-muted">
            Not loading?{' '}
            <a className="text-accent underline underline-offset-4" href={video.url} target="_blank" rel="noreferrer">
              Open on {host[video.type] || 'the site'} ↗
            </a>
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
