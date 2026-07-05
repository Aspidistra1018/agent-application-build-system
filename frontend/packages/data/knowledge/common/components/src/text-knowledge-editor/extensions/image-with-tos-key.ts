import Image from '@tiptap/extension-image';

// Extend TipTap Image to support a custom data-tos-key HTML attribute
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageWithTosKey: {
      setImageWithTosKey: (options: {
        src: string;
        alt?: string;
        title?: string;
        dataTosKey?: string | null;
      }) => ReturnType;
    };
  }
}

const ImageWithTosKey = Image.extend({
  addAttributes() {
    const parentAttributes = (this.parent?.() as Record<string, unknown>) || {};
    return {
      ...parentAttributes,
      dataTosKey: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute('data-tos-key'),
        renderHTML: (attributes: { dataTosKey?: string | null }) => {
          if (!attributes.dataTosKey) {
            return {};
          }
          return { 'data-tos-key': attributes.dataTosKey };
        },
      },
    };
  },

  addCommands() {
    return {
      setImageWithTosKey:
        (options: {
          src: string;
          alt?: string;
          title?: string;
          dataTosKey?: string | null;
        }) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              alt: options.alt,
              title: options.title,
              dataTosKey: options.dataTosKey ?? null,
            },
          }),
    };
  },
});

export default ImageWithTosKey;
