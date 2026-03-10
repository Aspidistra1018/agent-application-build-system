# 空状态图标使用指南

## 可用的空状态图标

项目中现在提供了三种空状态图标选择：

### 1. 原始图标 (IconLargeEmpty)
```tsx
import { IconLargeEmpty } from '@coze-arch/bot-icons';

// 使用原始的复杂插画风格图标
<IconLargeEmpty />
```

### 2. 新版图标 (IconLargeEmptyNew) - 推荐
```tsx
import { IconLargeEmptyNew } from '@coze-arch/bot-icons';

// 使用新的简洁现代风格图标，包含"暂无内容"文字
<IconLargeEmptyNew />
```

### 3. 极简图标 (IconLargeEmptyMinimal)
```tsx
import { IconLargeEmptyMinimal } from '@coze-arch/bot-icons';

// 使用极简风格图标，不包含文字
<IconLargeEmptyMinimal />
```

## 使用建议

- **IconLargeEmptyNew**: 适合大多数空状态场景，设计现代简洁
- **IconLargeEmptyMinimal**: 适合需要纯图标的场景，或者需要自定义文字的情况
- **IconLargeEmpty**: 保留原始图标以确保向后兼容

## 替换步骤

如需将现有的 `IconLargeEmpty` 替换为新图标：

1. 找到使用 `IconLargeEmpty` 的组件
2. 将导入改为 `IconLargeEmptyNew` 或 `IconLargeEmptyMinimal`
3. 更新组件中的使用

```tsx
// 替换前
import { IconLargeEmpty } from '@coze-arch/bot-icons';
<IconLargeEmpty />

// 替换后
import { IconLargeEmptyNew } from '@coze-arch/bot-icons';
<IconLargeEmptyNew />
```