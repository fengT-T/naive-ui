import { h, inject, computed } from 'vue'
import { useMemo } from 'vooks'
import { warn, getSlot } from '../../_utils'

export default {
  name: 'ConfigProvider',
  alias: ['App'],
  provide () {
    return {
      NConfigProvider: this
    }
  },
  props: {
    abstract: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: undefined
    },
    locale: {
      type: Object,
      default: undefined
    },
    dateLocale: {
      type: Object,
      default: undefined
    },
    namespace: {
      type: String,
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    hljs: {
      type: Object,
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    },
    // wip, unstable
    unstableTheme: {
      type: Object,
      default: undefined
    },
    unstableThemeOverrides: {
      type: Object,
      default: undefined
    },
    // deprecated
    language: {
      type: String,
      default: undefined
    },
    lang: {
      type: String,
      default: undefined
    },
    as: {
      validator () {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    },
    themeEnvironment: {
      validator () {
        warn('config-provider', '`theme-environment` is deprecated.')
        return true
      },
      default: undefined
    },
    themeEnvironments: {
      validator () {
        warn('config-provider', '`theme-environments` is deprecated.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const NConfigProvider = inject('NConfigProvider', null)
    return {
      mergedBordered: useMemo(() => {
        const { bordered } = props
        return bordered === undefined
          ? NConfigProvider?.mergedBordered
          : bordered
      }),
      mergedNamespace: useMemo(() => {
        const { namespace } = props
        return namespace === undefined
          ? NConfigProvider?.mergedNamespace
          : namespace
      }),
      mergedLocale: computed(() => {
        const { locale } = props
        return locale === undefined ? NConfigProvider?.mergedLocale : locale
      }),
      mergedDateLocale: computed(() => {
        const { dateLocale } = props
        return dateLocale === undefined
          ? NConfigProvider?.mergedLocale
          : dateLocale
      }),
      mergedHljs: computed(() => {
        const { hljs } = props
        return hljs === undefined ? NConfigProvider?.mergedHljs : hljs
      }),
      // wip, unstable
      mergedUnstableTheme: computed(() => {
        const { unstableTheme } = props
        return unstableTheme === undefined
          ? NConfigProvider?.unstableTheme
          : unstableTheme
      }),
      mergedUnstableThemeOverrides: computed(() => {
        const { unstableThemeOverrides } = props
        return unstableThemeOverrides === undefined
          ? NConfigProvider?.unstableThemeOverrides
          : unstableThemeOverrides
      }),
      // deprecated
      mergedTheme: useMemo(() => {
        const { theme } = props
        return theme === undefined ? NConfigProvider?.mergedTheme : theme
      }),
      mergedLanguage: useMemo(() => {
        const { language, lang } = props
        return language === undefined
          ? lang === undefined
            ? NConfigProvider?.mergedLanguage
            : lang
          : language
      }),
      mergedThemeEnvironments: computed(() => {
        const { themeEnvironments, themeEnvironment } = props
        return themeEnvironments === undefined
          ? themeEnvironment === undefined
            ? NConfigProvider?.mergedThemeEnvironments
            : themeEnvironment
          : themeEnvironments
      })
    }
  },
  render () {
    return !this.abstract
      ? h(
        this.as || this.tag,
        {
          class: ['n-config-provider']
        },
        getSlot(this)
      )
      : getSlot(this)
  }
}
