require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    config.load_defaults 7.0

    config.generators.system_tests = nil
    config.active_job.queue_adapter = :delayed_job
    config.autoload_paths << Rails.root.join("app", "jobs")

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '127.0.0.1:5500', '127.0.0.1:5501'
        resource '/api/v1/*',
          headers: :any,
          methods: [:get, :post, :patch, :put, :delete, :options, :head],
          credentials: true
      end
    end
  end
end
