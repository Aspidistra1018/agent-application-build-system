# Agent Application Build System - 项目结构说明

本文档详细描述了项目的目录结构和各文件/目录的用途。

## 项目根目录

```
.
├── .github/           # GitHub 相关配置（CI/CD、Issue 模板等）
├── backend/           # 后端代码
├── docs/              # 项目文档
├── docker/            # Docker 相关配置
├── frontend/          # 前端代码
├── helm/              # Kubernetes Helm Charts
├── idl/               # 接口定义文件（Thrift/Protobuf）
├── scripts/           # 构建和部署脚本
├── .dockerignore      # Docker 忽略文件
├── .gitignore         # Git 忽略文件
├── Makefile           # 项目构建和任务自动化
└── README.md          # 项目说明文档
```

## 后端目录结构 (backend/)

```
backend/
├── api/               # API 定义和处理
│   ├── handler/       # 请求处理器（类似 Controller）
│   ├── middleware/    # 中间件
│   ├── model/         # 请求/响应模型
│   └── router/        # 路由定义
├── application/       # 应用服务层（类似 Service）
│   └── app/           # 应用服务实现
├── bizpkg/            # 业务公共包
├── cmd/               # 程序入口
├── crossdomain/       # 跨领域共享代码
├── domain/            # 领域层
│   └── agent/         # 代理相关领域
│       └── singleagent/ # 单代理实现
│           ├── entity/  # 领域实体
│           └── service/ # 领域服务
├── infra/             # 基础设施层
│   ├── cache/        # 缓存实现
│   ├── db/           # 数据库访问
│   ├── es/           # Elasticsearch 客户端
│   └── orm/          # ORM 实现
├── internal/          # 内部包（不对外暴露）
├── pkg/               # 公共库
└── types/             # 类型定义
```

### 主要目录说明

#### 1. `api/` - API 层
- `handler/`: 处理 HTTP 请求，类似于 Spring 的 Controller
- `middleware/`: 中间件，如认证、日志、限流等
- `model/`: 请求/响应数据结构
- `router/`: 路由定义

#### 2. `application/` - 应用服务层
- 实现具体的业务逻辑
- 协调领域对象完成业务用例
- 处理事务和并发

#### 3. `domain/` - 领域层
- 包含核心业务逻辑和领域模型
- 定义实体、值对象、领域服务
- 定义仓储接口

#### 4. `infra/` - 基础设施层
- 数据库访问实现
- 缓存实现
- 消息队列客户端
- 外部服务集成

#### 5. `pkg/` 和 `bizpkg/`
- `pkg/`: 与业务无关的通用代码
- `bizpkg/`: 业务相关的共享代码

## 前端目录结构 (frontend/)

```
frontend/
├── packages/
│   └── arch/
│       └── idl/
│           └── src/
│               └── auto-generated/  # 自动生成的 API 客户端
└── public/            # 静态资源
```

## 开发工作流

1. **定义接口**：在 `idl/` 中定义接口
2. **生成代码**：使用 `make gen` 生成代码
3. **实现业务逻辑**：在 `application/` 中实现业务逻辑
4. **处理请求**：在 `api/handler/` 中处理 HTTP 请求
5. **运行测试**：使用 `make test` 运行测试
6. **构建部署**：使用 `make build` 和 `make deploy`

## 构建和运行

```bash
# 安装依赖
make deps

# 生成代码
make gen

# 构建
make build

# 运行测试
make test

# 启动服务
make run
```

## 注意事项

1. 不要直接修改 `api/model/` 和 `api/router/` 下的生成代码
2. 业务逻辑应该放在 `application/` 或 `domain/` 中
3. 使用 `internal/` 目录存放不对外暴露的代码
4. 遵循 Go 的代码规范，使用 `gofmt` 和 `golint` 检查代码

## 贡献指南

1. 创建功能分支：`git checkout -b feature/your-feature`
2. 提交更改：`git commit -m "Add some feature"`
3. 推送到远程：`git push origin feature/your-feature`
4. 创建 Pull Request

## 许可证

[Apache License 2.0](LICENSE-APACHE)
